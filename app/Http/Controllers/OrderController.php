<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\DonHang;

class OrderController extends Controller
{
    // Hiển thị danh sách đơn hàng
    public function index()
    {
        $user = Auth::user();

        // Lấy đơn hàng của user hiện tại, kèm theo chi tiết sản phẩm và hình ảnh
        $orders = DonHang::with(['chiTiet.bienThe.sanPham', 'chiTiet.bienThe.hinhAnh'])
            ->where('user_id', $user->id)
            ->orderByDesc('created_at') // Đơn mới nhất lên đầu
            ->get();

        return Inertia::render('Order/Index', [
            'orders' => $orders
        ]);
    }

    // (Tùy chọn) Hiển thị chi tiết 1 đơn hàng cụ thể
    public function show($id)
    {
        $order = DonHang::with(['chiTiet.bienThe.sanPham', 'chiTiet.bienThe.hinhAnh'])
            ->where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        return Inertia::render('Order/Show', [
            'order' => $order
        ]);
    }
}