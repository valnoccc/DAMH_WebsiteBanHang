<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DanhMuc;

class CategoryController extends Controller
{
    // 1. Danh sách danh mục
    public function index()
    {
        // Lấy danh sách kèm tên danh mục cha (nếu có)
        $categories = DanhMuc::with('parent')
            ->orderByDesc('id')
            ->paginate(10);

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories
        ]);
    }

    // 2. Form thêm mới
    public function create()
    {
        // Lấy danh sách các danh mục để chọn làm cha (chỉ lấy các danh mục gốc)
        $parents = DanhMuc::whereNull('parent_id')->get();
        
        return Inertia::render('Admin/Category/Create', [
            'parents' => $parents
        ]);
    }

    // 3. Lưu danh mục mới
    public function store(Request $request)
    {
        $request->validate([
            'ten_danh_muc' => 'required|string|max:255',
            'parent_id'    => 'nullable|exists:DanhMuc,id',
        ]);

        DanhMuc::create([
            'ten_danh_muc' => $request->ten_danh_muc,
            'parent_id'    => $request->parent_id,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Thêm danh mục thành công!');
    }

    // 4. Form sửa
    public function edit($id)
    {
        $category = DanhMuc::findOrFail($id);
        
        // Lấy danh sách cha (trừ chính nó ra để tránh vòng lặp)
        $parents = DanhMuc::whereNull('parent_id')
            ->where('id', '!=', $id)
            ->get();

        return Inertia::render('Admin/Category/Edit', [
            'category' => $category,
            'parents' => $parents
        ]);
    }

    // 5. Cập nhật
    public function update(Request $request, $id)
    {
        $request->validate([
            'ten_danh_muc' => 'required|string|max:255',
            'parent_id'    => 'nullable|exists:DanhMuc,id',
        ]);

        $category = DanhMuc::findOrFail($id);
        $category->update([
            'ten_danh_muc' => $request->ten_danh_muc,
            'parent_id'    => $request->parent_id,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Cập nhật thành công!');
    }

    // 6. Xóa
    public function destroy($id)
    {
        $category = DanhMuc::findOrFail($id);

        // Kiểm tra xem có danh mục con không
        if ($category->children()->exists()) {
            return back()->withErrors(['error' => 'Không thể xóa danh mục này vì nó đang chứa các danh mục con.']);
        }

        // Kiểm tra xem có sản phẩm không
        if ($category->sanPhams()->exists()) {
             return back()->withErrors(['error' => 'Không thể xóa danh mục này vì đang có sản phẩm thuộc về nó.']);
        }

        $category->delete();

        return back()->with('success', 'Đã xóa danh mục!');
    }
}