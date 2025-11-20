<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SanPham;
use App\Models\DanhMuc;

class ProductController extends Controller
{
    /**
     * Display product listing page with filters.
     */
   public function index(Request $request)
    {
        // 1. Khởi tạo query lấy Sản Phẩm kèm Hình Ảnh
        $query = SanPham::with('hinhAnh'); 

        // 2. LỌC THEO DANH MỤC (Logic cũ + nâng cấp nhẹ)
        $categoryName = 'Tất cả sản phẩm';
        if ($request->filled('danh_muc_id')) {
            $danhMucId = $request->danh_muc_id;
            $category = DanhMuc::find($danhMucId);

            if ($category) {
                $categoryName = $category->ten_danh_muc;
                // Lấy danh mục con nếu đây là danh mục cha
                $childIds = DanhMuc::where('parent_id', $danhMucId)->pluck('id');
                $childIds->push($danhMucId); // Gộp cả cha và con
                $query->whereIn('danh_muc_id', $childIds);
            }
        }

        // 3. LỌC THEO MÀU SẮC (Dùng whereHas để chọc vào bảng BienTheSanPham)
        if ($request->filled('color')) {
            $query->whereHas('bienThe', function ($q) use ($request) {
                $q->where('color', $request->color);
            });
        }

        // 4. LỌC THEO KÍCH THƯỚC
        if ($request->filled('size')) {
            $query->whereHas('bienThe', function ($q) use ($request) {
                $q->where('size', $request->size);
            });
        }

        // 5. LỌC THEO KHOẢNG GIÁ (Giá bán thực tế trong bảng biến thể)
        if ($request->filled('min_price') || $request->filled('max_price')) {
            $query->whereHas('bienThe', function ($q) use ($request) {
                if ($request->filled('min_price')) {
                    $q->where('gia_ban', '>=', $request->min_price);
                }
                if ($request->filled('max_price')) {
                    $q->where('gia_ban', '<=', $request->max_price);
                }
            });
        }

        // 6. Thực hiện truy vấn + Phân trang
        // withQueryString() cực quan trọng: Giữ lại các bộ lọc khi bấm sang trang 2, 3...
        $products = $query->paginate(12)->withQueryString();

        // 7. Lấy danh sách Danh Mục để hiển thị ở Sidebar bên trái
        $categories = DanhMuc::all(); 

        return Inertia::render('Product/Index', [
            'products' => $products,
            'categoryName' => $categoryName,
            'categories' => $categories, // Truyền danh sách danh mục sang React
        ]);
    }

    /**
     * Display product detail page.
     */
    public function show($id)
    {
        $product = SanPham::with(['danhMuc', 'hinhAnh', 'bienThe'])->findOrFail($id);

        return Inertia::render('Product/Detail', [
            'product' => $product,
        ]);
    }
}