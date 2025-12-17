import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
// Import icon
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
// Import Navigation Component
import Navigation from '../Components/Navigation';

// Đây là Layout chung cho các trang
export default function AppLayout({ children }) {
    // 1. Lấy thông tin User và Số lượng giỏ hàng từ Backend (Middleware)
    const { auth, cartCount } = usePage().props;

    const [profileOpen, setProfileOpen] = useState(false);

    // 2. ĐÃ XÓA HOÀN TOÀN useEffect và sessionStorage ở đây

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* ======== HEADER ======== */}
            <header className="sticky top-0 z-50 bg-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* 1. Logo */}
                    <Link href="/" className="text-3xl font-black bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent hover:scale-110 transition-transform">
                        MinhBell Fashion
                    </Link>

                    {/* 2. Thanh Tìm Kiếm */}
                    <div className="relative w-1/2 hidden md:block">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full border-2 border-primary-200 rounded-full py-3 px-5 focus:outline-none focus:border-accent-500 focus:ring-3 focus:ring-accent-200 bg-gradient-to-r from-primary-50 to-accent-50 font-semibold"
                        />
                    </div>

                    {/* 3. Biểu tượng người dùng và giỏ hàng */}
                    <div className="flex items-center space-x-6">
                        {auth.user ? (
                            // Nếu đã đăng nhập: Hiển thị dropdown menu
                            <div className="relative">
                                <button
                                    id="profile-btn"
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center justify-center w-8 h-8 hover:scale-125 transition-all text-gray-400"
                                >
                                    <FaUser size={24} />
                                </button>

                                {/* Dropdown Menu */}
                                {profileOpen && (
                                    <div id="profile-dropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-primary-200 py-2 z-50" onClick={(e) => e.stopPropagation()}>
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="text-gray-800 font-semibold text-sm">{auth.user.name}</p>
                                            <p className="text-gray-500 text-xs">{auth.user.email}</p>
                                        </div>

                                        <Link
                                            href="/profile"
                                            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-semibold transition-all"
                                        >
                                            Hồ sơ cá nhân
                                        </Link>

                                        <Link
                                            href="/orders" // Bạn cần tạo trang này sau
                                            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-semibold transition-all"
                                        >
                                            Đơn hàng của tôi
                                        </Link>

                                        <button
                                            onClick={() => {
                                                router.post('/logout');
                                            }}
                                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-semibold transition-all border-t border-gray-200"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Nếu chưa đăng nhập: Hiển thị 2 nút đăng nhập và đăng ký
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 bg-gray-100 text-black font-semibold rounded-lg hover:bg-green-400 transition-all hover:scale-105"
                                >
                                    Đăng Nhập
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
                                >
                                    Đăng Ký
                                </Link>
                            </div>
                        )}

                        {/* Icon Giỏ Hàng */}
                        <Link
                            href="/cart"
                            className="relative flex items-center justify-center w-8 h-8 hover:scale-125 transition-all text-gray-400"
                        >
                            <FaShoppingCart size={24} />

                            {/* Badge số lượng (Lấy từ Database qua Props) */}
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                <Navigation />
            </header>

            {/* ======== NỘI DUNG TRANG ======== */}
            <main>
                {children}
            </main>

            {/* ======== FOOTER ======== */}
            <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-20">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Col 1 (Logo hoặc giới thiệu ngắn - đang để trống theo code cũ) */}
                    <div className='mx-auto'>
                        <h4 className="text-lg font-black text-white mb-4">VỀ CHÚNG TÔI</h4>
                        <p className="text-gray-300">Thương hiệu thời trang uy tín hàng đầu.</p>
                    </div>

                    {/* Col 2 */}
                    <div className='mx-auto'>
                        <h4 className="text-lg font-black text-white mb-4">CHÍNH SÁCH</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">Chính sách đổi trả</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">Chính sách vận chuyển</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">Chính sách bảo mật</a></li>
                        </ul>
                    </div>
                    {/* Col 3 */}
                    <div>
                        <h4 className="text-lg font-black text-white mb-4"> THEO DÕI CHÚNG TÔI</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-blue-400 hover:translate-x-1 transition-all">Facebook</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-accent-400 hover:translate-x-1 transition-all">Instagram</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-black hover:translate-x-1 transition-all">Tiktok</a></li>
                        </ul>
                    </div>
                    {/* Col 4 */}
                    <div>
                        <h4 className="text-lg font-black text-white mb-4">NHẬN TIN KHUYẾN MÃI</h4>
                        <p className="text-gray-300 mb-3">Nhận mã giảm giá và thông tin sale mới nhất!</p>
                        <input
                            type="email"
                            placeholder="Email của bạn..."
                            className="w-full bg-gray-700 border-2 border-primary-500 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-300 font-semibold"
                        />
                    </div>
                </div>
            </footer>
        </div>
    );
}