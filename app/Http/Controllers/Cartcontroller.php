<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\GioHang;
use App\Models\BienTheSanPham;
use App\Models\SanPham;

class CartController extends Controller
{
    /**
     * Hiển thị giỏ hàng
     */
    public function index()
    {
        // 1. Nếu chưa đăng nhập -> Chuyển hướng Login
        if (!Auth::check()) {
             return redirect()->route('login')->with('error', 'Vui lòng đăng nhập để xem giỏ hàng.');
        }

        // 2. Lấy giỏ hàng từ Database của User hiện tại
        $cartItemsRaw = GioHang::with(['bienThe.sanPham', 'bienThe.hinhAnh'])
            ->where('user_id', Auth::id())
            ->get();

        // 3. Format lại dữ liệu cho khớp với Frontend React (CartItems đang mong đợi)
        // Frontend đang dùng dạng Object { key: item }, ta sẽ chuyển đổi sang dạng đó hoặc Mảng tùy logic FE
        // Ở đây để đơn giản và khớp với code React 'Object.entries(cartItems)', ta trả về dạng Mảng Key-Value
        $cartItems = [];
        $total = 0;

        foreach ($cartItemsRaw as $item) {
            // Tạo key duy nhất (giống logic session cũ để React không bị lỗi key)
            $itemKey = $item->bienThe->san_pham_id . '_' . $item->bienThe->size . '_' . $item->bienThe->color;
            
            // Lấy ảnh: ưu tiên ảnh biến thể, nếu không có lấy ảnh sản phẩm gốc
            $imgUrl = '/images/placeholder.png';
            if ($item->bienThe->hinh_anh) {
                $imgUrl = $item->bienThe->hinh_anh->url;
            } elseif ($item->bienThe->sanPham && $item->bienThe->sanPham->hinhAnh->count() > 0) {
                $imgUrl = $item->bienThe->sanPham->hinhAnh->first()->url;
            }

            $cartItems[$itemKey] = [
                'id' => $item->id, // ID của dòng trong bảng GioHang (để xóa/sửa)
                'san_pham_id' => $item->bienThe->san_pham_id,
                'ten_san_pham' => $item->bienThe->sanPham->ten_san_pham ?? 'Sản phẩm lỗi',
                'size' => $item->bienThe->size,
                'color' => $item->bienThe->color,
                'gia_ban' => $item->bienThe->gia_ban,
                'quantity' => $item->so_luong,
                'hinh_anh_url' => $imgUrl,
                'bien_the_id' => $item->bien_the_id
            ];

            $total += $item->so_luong * $item->bienThe->gia_ban;
        }

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems, // Trả về Object/Array key-value
            'total' => $total,
            'itemCount' => count($cartItems),
        ]);
    }

    /**
     * Thêm vào giỏ hàng (Lưu DB)
     */
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $validated = $request->validate([
            'san_pham_id' => 'required|integer',
            'size' => 'required|string',
            'color' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        // 1. Tìm biến thể
        $variant = BienTheSanPham::where('san_pham_id', $validated['san_pham_id'])
            ->where('size', $validated['size'])
            ->where('color', $validated['color'])
            ->first();

        if (!$variant) {
            return back()->with('error', 'Phiên bản sản phẩm không tồn tại.');
        }

        // 2. Kiểm tra tồn kho
        if ($variant->so_luong_ton < $validated['quantity']) {
            return back()->with('error', 'Số lượng tồn kho không đủ.');
        }

        // 3. Tìm xem đã có trong giỏ chưa
        $cartItem = GioHang::where('user_id', Auth::id())
            ->where('bien_the_id', $variant->id)
            ->first();

        if ($cartItem) {
            $cartItem->so_luong += $validated['quantity'];
            $cartItem->save();
        } else {
            GioHang::create([
                'user_id' => Auth::id(),
                'bien_the_id' => $variant->id,
                'so_luong' => $validated['quantity'],
            ]);
        }

        return back()->with('success', 'Đã thêm vào giỏ hàng!');
    }

    /**
     * Cập nhật số lượng
     */
    public function update(Request $request, $itemKey)
    {
        // itemKey ở đây có thể là ID của bảng GioHang (nếu React gửi ID)
        // HOẶC là chuỗi 'id_size_color' (nếu React gửi key cũ).
        // Tốt nhất là sửa React để gửi ID. Nhưng nếu React gửi Key cũ, ta phải parse.
        
        // Giả sử itemKey ở đây là string 'spId_size_color', ta cần tìm lại biến thể để update
        // TUY NHIÊN: Cách tối ưu nhất là Frontend nên gửi ID của bản ghi GioHang.
        // Để code chạy được với Frontend hiện tại (gửi key ghép), ta sẽ làm như sau:

        $parts = explode('_', $itemKey);
        if (count($parts) == 3) {
            $spId = $parts[0];
            $size = $parts[1];
            $color = $parts[2];

            $variant = BienTheSanPham::where('san_pham_id', $spId)
                ->where('size', $size)
                ->where('color', $color)
                ->first();

            if ($variant) {
                GioHang::where('user_id', Auth::id())
                    ->where('bien_the_id', $variant->id)
                    ->update(['so_luong' => $request->quantity]);
            }
        }

        return back();
    }

    /**
     * Xóa sản phẩm
     */
    public function destroy($itemKey)
    {
        // Tương tự update, parse key 'spId_size_color'
        $parts = explode('_', $itemKey);
        if (count($parts) == 3) {
            $spId = $parts[0];
            $size = $parts[1];
            $color = $parts[2];

            $variant = BienTheSanPham::where('san_pham_id', $spId)
                ->where('size', $size)
                ->where('color', $color)
                ->first();

            if ($variant) {
                GioHang::where('user_id', Auth::id())
                    ->where('bien_the_id', $variant->id)
                    ->delete();
            }
        }
        return back()->with('success', 'Đã xóa sản phẩm!');
    }

    /**
     * Xóa toàn bộ
     */
    public function clear()
    {
        GioHang::where('user_id', Auth::id())->delete();
        return back()->with('success', 'Giỏ hàng đã được làm trống!');
    }
}