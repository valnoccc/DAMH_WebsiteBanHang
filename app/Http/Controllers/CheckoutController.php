<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\GioHang;
use App\Models\DonHang;
use App\Models\ChiTietDonHang;

class CheckoutController extends Controller
{
    // 1. Hiển thị trang thanh toán
    public function index()
    {
        $cartItems = GioHang::with(['bienThe.sanPham', 'bienThe.hinhAnh'])
            ->where('user_id', Auth::id())
            ->get();

        $total = $cartItems->sum(fn($item) => $item->so_luong * $item->bienThe->gia_ban);

        return Inertia::render('Checkout/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
            'user' => Auth::user()
        ]);
    }

    // 2. Xử lý đặt hàng
    public function store(Request $request)
    {
        $request->validate([
            'dia_chi' => 'required|string',
            'ghi_chu' => 'nullable|string',
            'phuong_thuc_thanh_toan' => 'required|in:COD,BANK',
        ]);

        $user = Auth::user();
        if (empty($user->phone)) return back()->withErrors(['error' => 'Vui lòng cập nhật số điện thoại.']);

        $cartItems = GioHang::with('bienThe')->where('user_id', $user->id)->get();
        if ($cartItems->isEmpty()) return back()->withErrors(['error' => 'Giỏ hàng trống']);

        try {
            // Bước 1: Tạo đơn hàng trong Database
            $order = DB::transaction(function () use ($request, $user, $cartItems) {
                $totalAmount = $cartItems->sum(fn($item) => $item->so_luong * $item->bienThe->gia_ban);

                $fullAddressInfo = "Người nhận: {$user->name} | SĐT: {$user->phone} | Đ/c: {$request->dia_chi}";
                if ($request->ghi_chu) $fullAddressInfo .= " | Ghi chú: {$request->ghi_chu}";

                // Tạo đơn hàng
                $order = DonHang::create([
                    'user_id' => $user->id,
                    'tong_tien' => $totalAmount,
                    'trang_thai' => 'pending',
                    'dia_chi_giao_hang' => $fullAddressInfo,
                    'phuong_thuc_thanh_toan' => $request->phuong_thuc_thanh_toan,
                ]);

                // Tạo chi tiết đơn hàng và trừ tồn kho
                foreach ($cartItems as $item) {
                    ChiTietDonHang::create([
                        'don_hang_id' => $order->id,
                        'bien_the_id' => $item->bien_the_id,
                        'so_luong' => $item->so_luong,
                        'don_gia' => $item->bienThe->gia_ban,
                    ]);

                    // Kiểm tra và trừ tồn kho
                    if ($item->bienThe->so_luong_ton < $item->so_luong) {
                        throw new \Exception("Sản phẩm {$item->bienThe->sku} không đủ số lượng.");
                    }
                    $item->bienThe->decrement('so_luong_ton', $item->so_luong);
                }

                // Xóa giỏ hàng
                GioHang::where('user_id', $user->id)->delete();

                return $order;
            });

            // Bước 2: Điều hướng thanh toán
            if ($request->phuong_thuc_thanh_toan === 'BANK') {
                try {
                    return $this->processMomoPayment($order);
                } catch (\Exception $e) {
                    // Nếu gọi API MoMo thất bại ngay lập tức (lỗi mạng, config sai...)
                    // Thực hiện hoàn tác đơn hàng ngay
                    $this->cancelOrderAndRestoreStock($order->id);
                    throw $e;
                }
            }

            // Nếu là COD
            return redirect()->route('checkout.success');
        } catch (\Exception $e) {
            // --- ĐOẠN DEBUG (Sẽ xóa sau khi sửa xong) ---
            // Dòng này sẽ làm trang web dừng lại ngay lập tức và in lỗi ra màn hình đen
            dd([
                'LỖI GẶP PHẢI' => $e->getMessage(),
                'Dòng lỗi' => $e->getLine(),
                'File lỗi' => $e->getFile(),
                'Stack Trace' => $e->getTraceAsString()
            ]);
            // ---------------------------------------------

            Log::error('Checkout error: ' . $e->getMessage());
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    // 3. Hàm xử lý gọi API MoMo
    public function processMomoPayment($order)
    {
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

        $partnerCode = env('MOMO_PARTNER_CODE');
        $accessKey   = env('MOMO_ACCESS_KEY');
        $secretKey   = env('MOMO_SECRET_KEY');

        $requestId = (string) time();
        $orderId   = $order->id . "_" . $requestId;
        $amount    = (string) ((int)$order->tong_tien);
        $orderInfo = "Thanh toan don hang #" . $order->id;
        $redirectUrl = env('MOMO_RETURN_URL');
        $ipnUrl      = env('MOMO_NOTIFY_URL');
        $extraData   = "";
        $requestType = "payWithATM";

        // ✅ FIX: Thêm "lang" vào rawHash và sắp xếp đúng thứ tự alphabet
        $rawHash =
            "accessKey={$accessKey}" .
            "&amount={$amount}" .
            "&extraData={$extraData}" .
            "&ipnUrl={$ipnUrl}" .
            "&orderId={$orderId}" .
            "&orderInfo={$orderInfo}" .
            "&partnerCode={$partnerCode}" .
            "&redirectUrl={$redirectUrl}" .
            "&requestId={$requestId}" .
            "&requestType={$requestType}";

        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        // ✅ Body request
        $data = [
            'partnerCode' => $partnerCode,
            'partnerName' => 'Test',
            'storeId'     => 'MomoTestStore',
            'requestId'   => $requestId,
            'amount'      => $amount,
            'orderId'     => $orderId,
            'orderInfo'   => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl'      => $ipnUrl,
            'lang'        => 'vi',
            'extraData'   => $extraData,
            'requestType' => $requestType,
            'signature'   => $signature
        ];

        $response = Http::withoutVerifying()
            ->withHeaders(['Content-Type' => 'application/json'])
            ->post($endpoint, $data);

        $result = $response->json();

        // Debug nếu lỗi
        if (!isset($result['payUrl']) || $result['resultCode'] != 0) {
            dd([
                'rawHash'   => $rawHash,
                'signature' => $signature,
                'data'      => $data,
                'response'  => $result
            ]);
        }

        return Inertia::location($result['payUrl']);
    }

    // 4. Xử lý khi người dùng quay lại từ MoMo (Redirect URL)
    public function momoReturn(Request $request)
    {
        $orderIdRaw = $request->query('orderId');
        $resultCode = $request->query('resultCode');

        if (!$orderIdRaw) {
            return redirect()->route('checkout.index')->withErrors(['error' => 'Dữ liệu không hợp lệ.']);
        }

        // Lấy ID thật từ chuỗi orderId (VD: 15_12345678 -> 15)
        $orderId = explode('_', $orderIdRaw)[0];

        if ($resultCode == 0) {
            // ✅ Thành công: Cập nhật trạng thái
            DonHang::where('id', $orderId)->update(['trang_thai' => 'processing']);
            return redirect()->route('checkout.success');
        } else {
            // Thất bại: Hoàn tác đơn hàng
            $this->cancelOrderAndRestoreStock($orderId);
            return redirect()->route('checkout.index')->withErrors([
                'error' => 'Giao dịch thất bại hoặc bị hủy. Giỏ hàng của bạn đã được khôi phục.'
            ]);
        }
    }

    // 5. Webhook xử lý ngầm (IPN)
    public function momoNotify(Request $request)
    {
        $orderIdRaw = $request->input('orderId');
        $resultCode = $request->input('resultCode');

        if (!$orderIdRaw) return response()->json(['message' => 'Invalid data'], 400);

        $orderId = explode('_', $orderIdRaw)[0];

        if ($resultCode == 0) {
            DonHang::where('id', $orderId)->update(['trang_thai' => 'processing']);
            Log::info("Webhook: Order #{$orderId} confirmed success.");
        } else {
            $this->cancelOrderAndRestoreStock($orderId);
            Log::warning("Webhook: Order #{$orderId} failed.");
        }

        return response()->json(['message' => 'OK']);
    }

    // 6. Hàm tiện ích: Hủy đơn và Khôi phục tồn kho (Tránh lặp code)
    private function cancelOrderAndRestoreStock($orderId)
    {
        DB::transaction(function () use ($orderId) {
            // LockForUpdate để tránh xung đột giữa momoReturn và momoNotify
            $order = DonHang::where('id', $orderId)->lockForUpdate()->first();

            // Chỉ xử lý nếu đơn hàng tồn tại
            if ($order) {
                $orderDetails = ChiTietDonHang::where('don_hang_id', $orderId)->get();

                // a. Khôi phục tồn kho
                foreach ($orderDetails as $detail) {
                    if ($detail->bienThe) {
                        $detail->bienThe->increment('so_luong_ton', $detail->so_luong);
                    }
                }

                // b. Khôi phục giỏ hàng cho user
                foreach ($orderDetails as $detail) {
                    GioHang::create([
                        'user_id' => $order->user_id,
                        'bien_the_id' => $detail->bien_the_id,
                        'so_luong' => $detail->so_luong,
                    ]);
                }

                // c. Xóa sạch dữ liệu đơn hàng lỗi
                ChiTietDonHang::where('don_hang_id', $orderId)->delete();
                $order->delete();

                Log::info("Order #{$orderId} cancelled & stock restored.");
            }
        });
    }

    // 7. Trang Mock MoMo (Dùng cho đồ án)
    public function momoPaymentForm(Request $request)
    {
        $orderId = $request->query('orderId');
        // Nên lấy thêm số tiền để hiển thị
        $amount = 0;
        if ($orderId) {
            $realId = explode('_', $orderId)[0];
            $order = DonHang::find($realId);
            if ($order) $amount = $order->tong_tien;
        }

        return Inertia::render('Payment/MomoMock', [
            'orderId' => $orderId,
            'amount' => $amount
        ]);
    }

    // 8. Trang thành công
    public function success()
    {
        return Inertia::render('Checkout/Success');
    }
}
