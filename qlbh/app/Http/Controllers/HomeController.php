<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // <-- Thêm dòng này
use App\Models\SanPham; // <-- Thêm dòng này

class HomeController extends Controller
{
    /**
     * Hiển thị trang chủ.
     */
    public function index()
    {
        // Lấy tất cả sản phẩm, VÀ lấy luôn 'hinhAnh' đi kèm
        $products = SanPham::with('hinhAnh')->get();

        // Trả về component React 'Home'
        // và truyền dữ liệu 'products' sang
        return Inertia::render('Home', [
            'products' => $products,
        ]);
    }
}