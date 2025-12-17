<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DonHang;

class OrderController extends Controller
{
    // 1. Danh sách đơn hàng
    public function index()
    {
        $orders = DonHang::with('user') // Load user để lấy tên nếu cần
            ->orderByDesc('created_at') // Mới nhất lên đầu
            ->paginate(10);

        return Inertia::render('Admin/Order/Index', [
            'orders' => $orders
        ]);
    }

    // 2. Xem chi tiết đơn hàng
    public function show($id)
    {
        $order = DonHang::with(['chiTiet.bienThe.sanPham', 'chiTiet.bienThe.hinhAnh', 'user'])
            ->findOrFail($id);

        return Inertia::render('Admin/Order/Show', [
            'order' => $order
        ]);
    }

    // 3. Cập nhật trạng thái đơn hàng
    public function update(Request $request, $id)
    {
        $request->validate([
            'trang_thai' => 'required|in:pending,processing,shipped,completed,cancelled',
        ]);

        $order = DonHang::findOrFail($id);
        $order->update(['trang_thai' => $request->trang_thai]);

        return back()->with('success', 'Cập nhật trạng thái đơn hàng thành công!');
    }
}