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

    // 3. Xử lý lưu sản phẩm (Store)
    public function store(Request $request)
    {
        // 1. Giải nén JSON
        if ($request->has('variants') && is_string($request->variants)) {
            $request->merge([
                'variants' => json_decode($request->variants, true)
            ]);
        }

        // 2. Validate
        $request->validate([
            'ten_san_pham' => 'required|string|max:255',
            'danh_muc_id'  => 'required',
            'gia_goc'      => 'required|numeric|min:0',
            'slug'         => 'required|string|unique:SanPham,slug',
            // Validate ảnh: 'images' là mảng, 'images.*' là từng file
            'images'       => 'nullable|array',
            'images.*'     => 'image|mimes:jpeg,png,jpg,webp|max:2048',

            'variants'     => 'required|array|min:1',
            'variants.*.size'   => 'required|string',
            'variants.*.color'  => 'required|string',
            'variants.*.price'  => 'required|numeric',
            'variants.*.stock'  => 'required|integer',
        ]);

        // 3. Xử lý logic
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

                // B. Xử lý Upload Ảnh (Lưu vào disk public)
                $thumbnailId = null;

                if ($request->hasFile('images')) {
                    // Đảm bảo luôn là mảng
                    $files = is_array($request->file('images'))
                        ? $request->file('images')
                        : [$request->file('images')];

                    foreach ($files as $index => $file) {
                        // Lưu vào storage/app/public/products
                        $path = $file->store('products', 'public');
                        $url = '/storage/' . $path;

                        $img = HinhAnhSanPham::create([
                            'san_pham_id'  => $product->id,
                            'url'          => $url,
                            'is_thumbnail' => $index === 0, // Ảnh đầu tiên là thumbnail
                        ]);

                        if ($index === 0) {
                            $thumbnailId = $img->id;
                        }
                    }
                }

                // Load lại quan hệ (để chắc chắn có dữ liệu mới nhất)
                $product->load('hinhAnh');

                // C. Tạo Biến Thể
                foreach ($request->variants as $variant) {
                    if (empty($variant['size']) || empty($variant['color'])) continue;

                    BienTheSanPham::create([
                        'san_pham_id'  => $product->id,
                        'size'         => $variant['size'],
                        'color'        => $variant['color'],
                        'gia_ban'      => $variant['price'] ?? 0,
                        'so_luong_ton' => $variant['stock'] ?? 0,
                        'sku'          => $product->slug . '-' . $variant['size'] . '-' . $variant['color'],
                        'hinh_anh_id'  => $thumbnailId,
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

    public function edit($id)
    {
        $product = SanPham::with(['hinhAnh', 'bienThe'])->findOrFail($id);
        $categories = DanhMuc::all();

        return Inertia::render('Admin/Product/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    // 5. Xử lý cập nhật
    public function update(Request $request, $id)
    {
        // 1. GIẢI NÉN JSON (Nếu frontend gửi dạng JSON String)
        if ($request->has('variants') && is_string($request->variants)) {
            $request->merge([
                'variants' => json_decode($request->variants, true)
            ]);
        }

        $product = SanPham::findOrFail($id);

        // 2. Validate cơ bản
        $request->validate([
            'ten_san_pham' => 'required|string|max:255',
            'danh_muc_id'  => 'required',
            'gia_goc'      => 'required|numeric|min:0',
            'slug'         => 'required|string|unique:SanPham,slug,' . $id,
            // Bỏ validate ảnh chi tiết ở đây để tránh lỗi mảng/null, ta sẽ check thủ công bên dưới
        ]);

        try {
            DB::transaction(function () use ($request, $product) {
                // A. Cập nhật thông tin chung
                $product->update([
                    'ten_san_pham' => $request->ten_san_pham,
                    'slug'         => $request->slug,
                    'danh_muc_id'  => $request->danh_muc_id,
                    'gia_goc'      => $request->gia_goc,
                    'mo_ta'        => $request->mo_ta,
                ]);

                // B. Xử lý ảnh (CODE CHUẨN ĐỂ HIỆN ẢNH)
                if ($request->hasFile('new_images')) {
                    $files = is_array($request->file('new_images'))
                        ? $request->file('new_images')
                        : [$request->file('new_images')];

                    foreach ($files as $file) {
                        // Lưu vào disk 'public' để có thể truy cập từ web
                        // File sẽ nằm ở: storage/app/public/products/abc.jpg
                        $path = $file->store('products', 'public');

                        // Tạo URL chuẩn: /storage/products/abc.jpg
                        $url = '/storage/' . $path;

                        HinhAnhSanPham::create([
                            'san_pham_id'  => $product->id,
                            'url'          => $url,
                            'is_thumbnail' => false,
                        ]);
                    }
                }

                // Load lại để lấy ảnh mới nhất (cho phần tạo biến thể bên dưới)
                $product->load('hinhAnh');
                $thumbnailId = $product->hinhAnh->first()->id ?? null;

                // C. Xử lý biến thể (CODE PHÒNG THỦ)
                if (is_array($request->variants)) {
                    foreach ($request->variants as $variant) {

                        // --- KIỂM TRA AN TOÀN ---
                        // Nếu dòng này bị thiếu size hoặc color -> Bỏ qua ngay, không báo lỗi
                        if (empty($variant['size']) || empty($variant['color'])) {
                            continue;
                        }
                        // ------------------------

                        if (isset($variant['id'])) {
                            // Cập nhật
                            BienTheSanPham::where('id', $variant['id'])->update([
                                'size'         => $variant['size'],
                                'color'        => $variant['color'],
                                'gia_ban'      => $variant['price'] ?? 0,
                                'so_luong_ton' => $variant['stock'] ?? 0,
                                'sku'          => $product->slug . '-' . $variant['size'] . '-' . $variant['color'],
                            ]);
                        } else {
                            // Tạo mới
                            BienTheSanPham::create([
                                'san_pham_id'  => $product->id,
                                'size'         => $variant['size'],
                                'color'        => $variant['color'],
                                'gia_ban'      => $variant['price'] ?? 0,
                                'so_luong_ton' => $variant['stock'] ?? 0,
                                'sku'          => $product->slug . '-' . $variant['size'] . '-' . $variant['color'],
                                'hinh_anh_id'  => $thumbnailId,
                            ]);
                        }
                    }
                }
            });

            return redirect()->route('admin.products.index')->with('success', 'Cập nhật thành công!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Lỗi: ' . $e->getMessage()]);
        }
    }

    public function deleteImage($id)
    {
        $image = HinhAnhSanPham::findOrFail($id);

        // 1. Xóa file vật lý trong Storage
        // Chuyển đổi URL "/storage/products/abc.jpg" thành đường dẫn thực "public/products/abc.jpg"
        $path = str_replace('/storage/', 'public/', $image->url);

        if (Storage::exists($path)) {
            Storage::delete($path);
        }

        // 2. Xóa trong Database
        $image->delete();

        return back()->with('success', 'Đã xóa ảnh thành công!');
    }
}
