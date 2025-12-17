<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\GioHang;
use App\Models\DonHang;
use App\Models\ChiTietDonHang;
use App\Models\BienTheSanPham;

class CheckoutController extends Controller
{
    // 1. Hiển thị trang thanh toán
    public function index()
    {
        // Lấy giỏ hàng của user hiện tại
        $cartItems = GioHang::with(['bienThe.sanPham', 'bienThe.hinhAnh'])
            ->where('user_id', Auth::id())
            ->get();

        // if ($cartItems->isEmpty()) {
        //     // Chuyển hướng về route 'cart.index' (tức là /cart)
        //     return redirect()->route('cart.index')->with('error', 'Giỏ hàng trống!');
        // }

        // Tính tổng tiền
        $total = $cartItems->sum(function ($item) {
            return $item->so_luong * $item->bienThe->gia_ban;
        });

        return Inertia::render('Checkout/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
            'user' => Auth::user() // Để điền sẵn tên, sđt
        ]);
    }

    // 2. Xử lý đặt hàng
    public function store(Request $request)
    {
        // 1. Validate (Bỏ validate sđt và họ tên vì lấy từ DB)
        $request->validate([
            'dia_chi' => 'required|string',
            'ghi_chu' => 'nullable|string',
            'phuong_thuc_thanh_toan' => 'required|in:COD,BANK',
        ]);

        try {
            DB::transaction(function () use ($request) {
                $user = Auth::user();
                
                // Kiểm tra User có SĐT chưa (quan trọng)
                if (empty($user->phone)) {
                    throw new \Exception('Vui lòng cập nhật số điện thoại trong hồ sơ trước khi đặt hàng.');
                }

                // ... (Logic lấy giỏ hàng giữ nguyên) ...
                $cartItems = GioHang::with('bienThe')->where('user_id', $user->id)->get();
                if ($cartItems->isEmpty()) throw new \Exception('Giỏ hàng trống');

                $totalAmount = 0;
                foreach ($cartItems as $item) {
                    if ($item->so_luong > $item->bienThe->so_luong_ton) {
                        throw new \Exception("Sản phẩm {$item->bienThe->sku} không đủ số lượng.");
                    }
                    $totalAmount += $item->so_luong * $item->bienThe->gia_ban;
                }

                // === KỸ THUẬT GỘP THÔNG TIN MỚI ===
                // Lấy Tên và SĐT từ $user (DB) chứ không phải từ form
                $fullAddressInfo = "Người nhận: {$user->name} | SĐT: {$user->phone} | Đ/c: {$request->dia_chi}";
                
                if ($request->ghi_chu) {
                    $fullAddressInfo .= " | Ghi chú: {$request->ghi_chu}";
                }

                // ... (Phần tạo đơn hàng và chi tiết đơn hàng giữ nguyên) ...
                $order = DonHang::create([
                    'user_id' => $user->id,
                    'tong_tien' => $totalAmount,
                    'trang_thai' => 'pending',
                    'dia_chi_giao_hang' => $fullAddressInfo,
                    'phuong_thuc_thanh_toan' => $request->phuong_thuc_thanh_toan,
                ]);

                foreach ($cartItems as $item) {
                    ChiTietDonHang::create([
                        'don_hang_id' => $order->id,
                        'bien_the_id' => $item->bien_the_id,
                        'so_luong' => $item->so_luong,
                        'don_gia' => $item->bienThe->gia_ban,
                    ]);
                    $item->bienThe->decrement('so_luong_ton', $item->so_luong);
                }

                GioHang::where('user_id', $user->id)->delete();
            });

            return redirect()->route('checkout.success');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Lỗi: ' . $e->getMessage()]);
        }
    }

    // 3. Trang thông báo thành công
    public function success()
    {
        return Inertia::render('Checkout/Success');
    }
}