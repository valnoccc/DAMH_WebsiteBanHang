<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\SanPham;
use App\Models\DanhMuc;
use App\Models\HinhAnhSanPham;
use App\Models\BienTheSanPham;

class ProductController extends Controller
{
    // 1. Danh sách sản phẩm
    public function index()
    {
        $products = SanPham::with(['danhMuc', 'hinhAnh'])
            ->orderByDesc('id')
            ->paginate(10);

        return Inertia::render('Admin/Product/Index', [
            'products' => $products
        ]);
    }

    // 2. Form thêm mới
    public function create()
    {
        $categories = DanhMuc::all();
        return Inertia::render('Admin/Product/Create', [
            'categories' => $categories
        ]);
    }

    // 3. Xử lý lưu sản phẩm (Logic phức tạp nhất)
    public function store(Request $request)
    {
        // Validate dữ liệu
        $request->validate([
            'ten_san_pham' => 'required|string|max:255',
            'danh_muc_id'  => 'required',
            'gia_goc'      => 'required|numeric|min:0',
            'slug'         => 'required|string|unique:SanPham,slug',
            'images.*'     => 'image|mimes:jpeg,png,jpg,webp|max:2048', // Ảnh
            'variants'     => 'required|array|min:1', // Phải có ít nhất 1 biến thể
        ]);

        try {
            DB::transaction(function () use ($request) {
                // A. Tạo Sản Phẩm Chung
                $product = SanPham::create([
                    'ten_san_pham' => $request->ten_san_pham,
                    'slug'         => $request->slug,
                    'danh_muc_id'  => $request->danh_muc_id,
                    'gia_goc'      => $request->gia_goc,
                    'mo_ta'        => $request->mo_ta,
                ]);

                // B. Xử lý Upload Ảnh
                $imageMap = []; // Dùng để map ảnh với biến thể
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $index => $file) {
                        $path = $file->store('public/products');
                        $url = Storage::url($path);
                        
                        $img = HinhAnhSanPham::create([
                            'san_pham_id'  => $product->id,
                            'url'          => $url,
                            'is_thumbnail' => $index === 0, // Ảnh đầu tiên là thumbnail
                        ]);
                        
                        // Lưu lại ID ảnh để gán cho biến thể (logic đơn giản: theo thứ tự)
                        $imageMap[$index] = $img->id;
                    }
                }

                // C. Tạo Biến Thể (Size/Màu)
                foreach ($request->variants as $variant) {
                    BienTheSanPham::create([
                        'san_pham_id'  => $product->id,
                        'size'         => $variant['size'],
                        'color'        => $variant['color'],
                        'gia_ban'      => $variant['price'],
                        'so_luong_ton' => $variant['stock'],
                        'sku'          => $product->slug . '-' . $variant['size'] . '-' . $variant['color'],
                        // Gán ảnh đầu tiên cho biến thể (hoặc logic chọn ảnh của bạn)
                        'hinh_anh_id'  => $imageMap[0] ?? null, 
                    ]);
                }
            });

            return redirect()->route('admin.products.index')->with('success', 'Thêm sản phẩm thành công!');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Lỗi: ' . $e->getMessage()]);
        }
    }

    // 4. Xóa sản phẩm
    public function destroy($id)
    {
        $product = SanPham::findOrFail($id);
        $product->delete(); // Các bảng con sẽ tự xóa nếu bạn cài 'ON DELETE CASCADE' trong SQL
        return back()->with('success', 'Đã xóa sản phẩm!');
    }
}