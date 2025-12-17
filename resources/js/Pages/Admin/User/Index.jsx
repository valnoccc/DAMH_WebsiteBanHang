import React, { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import { FaTrash, FaUserShield, FaUser, FaSearch } from 'react-icons/fa';

export default function UserIndex({ users }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState('');

    // Hàm xử lý thay đổi Role (Tự động cập nhật khi chọn)
    const handleRoleChange = (userId, newRole, userName) => {
        if (confirm(`Bạn có chắc muốn thay đổi quyền của "${userName}" thành "${newRole}" không?`)) {
            router.patch(route('admin.users.update', userId), {
                role: newRole
            }, {
                preserveScroll: true,
                onSuccess: () => alert('Cập nhật quyền thành công!'),
                onError: () => alert('Có lỗi xảy ra!')
            });
        } else {
            // Nếu hủy, reload lại để reset dropdown về giá trị cũ (hoặc dùng state quản lý phức tạp hơn)
            window.location.reload();
        }
    };

    // Hàm xử lý xóa User
    const handleDelete = (userId) => {
        if (confirm('CẢNH BÁO QUAN TRỌNG:\n\nXóa người dùng sẽ xóa toàn bộ đơn hàng và lịch sử mua sắm của họ.\nHành động này không thể hoàn tác.\n\nBạn có chắc chắn muốn xóa?')) {
            router.delete(route('admin.users.destroy', userId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {/* Header & Search */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý Người dùng</h1>
                        <p className="text-sm text-gray-500 mt-1">Tổng cộng: {users.total} tài khoản</p>
                    </div>

                    {/* Ô tìm kiếm (Giao diện demo, logic cần thêm ở backend sau này) */}
                    <div className="relative w-auto md:w-64">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <FaSearch />
                        </span>
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm email, tên..." 
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider border-b border-gray-200">
                                <th className="p-5">Người dùng</th>
                                <th className="p-5">Phân quyền</th>
                                <th className="p-5">Liên hệ</th>
                                <th className="p-5">Ngày tham gia</th>
                                <th className="p-5 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.data.map(user => {
                                const isCurrentUser = user.id === auth.user.id;
                                const isAdmin = user.role === 'admin';

                                return (
                                    <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${isCurrentUser ? 'bg-blue-50/50' : ''}`}>
                                        
                                        {/* Cột 1: Thông tin cơ bản */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar giả lập */}
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm
                                                    ${isAdmin ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'}
                                                `}>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 flex items-center gap-2">
                                                        {user.name}
                                                        {isCurrentUser && (
                                                            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-700 font-extrabold border border-blue-200">
                                                                You
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-gray-500">ID: #{user.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Cột 2: Vai trò (Dropdown) */}
                                        <td className="p-5">
                                            <div className="relative">
                                                {isCurrentUser ? (
                                                    // Nếu là chính mình -> Chỉ hiện text, không cho sửa
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                                                        <FaUserShield /> Quản trị viên
                                                    </span>
                                                ) : (
                                                    // Nếu là người khác -> Cho chọn Dropdown
                                                    <select 
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user.id, e.target.value, user.name)}
                                                        className={`appearance-none pl-8 pr-8 py-1.5 rounded-full text-xs font-bold border cursor-pointer focus:ring-2 focus:ring-offset-1 outline-none transition-all
                                                            ${isAdmin 
                                                                ? 'bg-purple-50 border-purple-200 text-purple-700 focus:ring-purple-500' 
                                                                : 'bg-gray-50 border-gray-200 text-gray-700 focus:ring-gray-400'}
                                                        `}
                                                    >
                                                        <option value="user">Khách hàng</option>
                                                        <option value="admin">Quản trị viên</option>
                                                    </select>
                                                )}
                                                
                                                {/* Icon trang trí cho Dropdown */}
                                                {!isCurrentUser && (
                                                    <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none
                                                        ${isAdmin ? 'text-purple-600' : 'text-gray-500'}
                                                    `}>
                                                        {isAdmin ? <FaUserShield /> : <FaUser />}
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* Cột 3: Liên hệ */}
                                        <td className="p-5 text-sm">
                                            <p className="text-gray-900 font-medium">{user.email}</p>
                                            <p className="text-gray-500 mt-0.5">{user.phone || '---'}</p>
                                        </td>

                                        {/* Cột 4: Ngày tham gia */}
                                        <td className="p-5 text-sm text-gray-600">
                                            {new Date(user.created_at).toLocaleDateString('vi-VN')}
                                        </td>

                                        {/* Cột 5: Hành động */}
                                        <td className="p-5 text-right">
                                            {!isCurrentUser && (
                                                <button 
                                                    onClick={() => handleDelete(user.id)}
                                                    className="group p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
                                                    title="Xóa người dùng này"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <Pagination links={users.links} />
                </div>
            </div>
        </AdminLayout>
    );
}