<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth; // Import Auth Facade

class UserController extends Controller
{
    // 1. Danh sách người dùng
    public function index()
    {
        $users = User::orderByDesc('id')->paginate(10);

        return Inertia::render('Admin/User/Index', [
            'users' => $users
        ]);
    }

    // 2. Cập nhật vai trò (Role)
    public function update(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        $user = User::findOrFail($id);
        
        // Kiểm tra: Nếu đang sửa chính mình
        if ($user->id === Auth::id()) {
            // Nếu cố tình hạ cấp xuống 'user' -> Báo lỗi
            if ($request->role !== 'admin') {
                return back()->withErrors(['error' => 'Bạn không thể tự hạ cấp quyền quản trị của mình!']);
            }
        }

        $user->update(['role' => $request->role]);

        return back()->with('success', 'Cập nhật vai trò thành công!');
    }

    // 3. Xóa người dùng
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Ngăn không cho tự xóa chính mình
        if ($user->id === Auth::id()) {
            return back()->withErrors(['error' => 'Bạn không thể tự xóa tài khoản của mình!']);
        }

        $user->delete();

        return back()->with('success', 'Đã xóa người dùng!');
    }
}