<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SanPham;
use App\Models\DanhMuc;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $danhMucId = $request->input('danh_muc_id');
        $query = SanPham::with('hinhAnh'); // Lấy luôn hình ảnh
        $categoryName = 'Tất cả sản phẩm';

        if ($danhMucId) {
            $category = DanhMuc::find($danhMucId);

            if ($category) {
                $categoryName = $category->ten_danh_muc;

                // Lấy ID của tất cả danh mục con
                $childIds = DanhMuc::where('parent_id', $danhMucId)->pluck('id');
                $childIds->push($danhMucId); // Bao gồm cả ID cha

                $query->whereIn('danh_muc_id', $childIds);
            }
        }
        
        // (Chúng ta sẽ thêm logic cho 'sale' sau)
        
        $products = $query->paginate(12);

        return Inertia::render('Product/Index', [
            'products' => $products, // Dữ liệu đã phân trang
            'categoryName' => $categoryName
        ]);
    }
}