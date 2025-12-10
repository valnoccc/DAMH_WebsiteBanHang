<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\HinhAnhSanPham; // <-- Import model của bạn

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        // 1. Xác thực (validate) file
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'san_pham_id' => 'required|integer|exists:SanPham,id' // <-- Đảm bảo sản phẩm tồn tại
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            
            // 2. Tạo tên file độc nhất (dựa theo thời gian)
            $fileName = time() . '_' . $file->getClientOriginalName();
            
            // 3. Lưu file vào thư mục `storage/app/public/products`
            // Laravel sẽ tự động tạo thư mục 'products' nếu chưa có
            $path = $file->storeAs('public/products', $fileName);

            // 4. Lấy URL công khai của file vừa lưu
            $url = Storage::url($path); 
            // $url bây giờ sẽ là: "/storage/products/ten-file.jpg"

            // 5. Lưu đường dẫn vào database
            $hinhAnh = new HinhAnhSanPham();
            $hinhAnh->san_pham_id = $request->input('san_pham_id');
            $hinhAnh->url = $url;
            $hinhAnh->alt_text = 'Mô tả ảnh'; // (Bạn có thể lấy thêm từ request)
            $hinhAnh->save();

            // 6. Trả về thông báo thành công (và URL)
            return response()->json([
                'message' => 'Tải ảnh lên thành công!',
                'url' => $url,
                'path' => $path
            ], 201);
        }

        return response()->json(['message' => 'Không tìm thấy file.'], 400);
    }
}