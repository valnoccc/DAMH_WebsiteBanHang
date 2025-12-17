import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers, FaTags, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { router } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 p-6 sticky top-0 h-screen">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-gray-900">Admin Panel</h2>
                    <p className="text-sm text-gray-500 mt-1">Quản lý hệ thống</p>
                </div>

                <nav className="space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                        <FaTachometerAlt /> <span className="font-semibold">Dashboard</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                        <FaBoxOpen /> <span className="font-semibold">Sản phẩm</span>
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                        <FaClipboardList /> <span className="font-semibold">Đơn hàng</span>
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                        <FaUsers /> <span className="font-semibold">Người dùng</span>
                    </Link>
                    <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                        <FaTags /> <span className="font-semibold">Danh mục</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                        <FaHome /> <span className="font-semibold">Trang chủ</span>
                    </Link>
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-3">Đăng nhập với:</div>
                    {auth.user ? (
                        <div className="text-sm text-gray-800 font-semibold">{auth.user.name}</div>
                    ) : (
                        <div className="text-sm text-gray-500">Không có người dùng</div>
                    )}

                    <button
                        onClick={() => router.post('/logout')}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        <FaSignOutAlt /> Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
