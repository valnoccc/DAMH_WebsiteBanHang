import { Link } from '@inertiajs/react';
import React from 'react';
// Import icon
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';

// Đây là Layout chung cho các trang
export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* ======== HEADER ======== */}
            <header className="sticky top-0 z-50 bg-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* 1. Logo */}
                    <Link href="/" className="text-3xl font-black bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent hover:scale-110 transition-transform">
                        ⚡ SHOP
                    </Link>

                    {/* 2. Thanh Tìm Kiếm (Giống Moji) */}
                    <div className="relative w-1/2 hidden md:block">
                        <input
                            type="text"
                            placeholder="🔍 Tìm kiếm sản phẩm..."
                            className="w-full border-2 border-violet-300 rounded-full py-3 px-5 focus:outline-none focus:border-pink-500 focus:ring-3 focus:ring-pink-200 bg-gradient-to-r from-violet-50 to-pink-50 font-semibold"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-500 text-xl">
                            🔎
                        </span>
                    </div>

                    {/* 3. Icons */}
                    <div className="flex items-center space-x-6 text-2xl">
                        <Link href="/login" className="text-violet-600 hover:text-pink-600 hover:scale-125 transition-all">
                            👤
                        </Link>
                        <Link href="/cart" className="relative text-violet-600 hover:text-pink-600 hover:scale-125 transition-all">
                            🛒
                            {/* (Sau này thêm số lượng ở đây) */}
                            {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span> */}
                        </Link>
                    </div>
                </div>

                {/* ======== MEGATRON MENU ======== */}
                <nav className="bg-gray-800 text-white">
                    <div className="container mx-auto px-4 flex justify-center space-x-10 py-3">
                        <Link href="/" className="font-semibold hover:text-gray-300">TRANG CHỦ</Link>
                        <Link href="/san-pham" className="font-semibold hover:text-gray-300">TẤT CẢ SẢN PHẨM</Link>

                        {/* Đây là các link quan trọng, trỏ đến ID danh mục cha */}
                        <Link href="/san-pham?danh_muc_id=1" className="font-semibold hover:text-gray-300">👕 THỜI TRANG NAM</Link>
                        <Link href="/san-pham?danh_muc_id=2" className="font-semibold hover:text-gray-300">👗 THỜI TRANG NỮ</Link>

                        {/* (Bạn có thể thêm link cho Giày, Khăn sau) */}

                        <Link href="/san-pham?sale=true" className="font-semibold text-red-400 hover:text-red-300">🔥 SALE</Link>
                    </div>
                </nav>
            </header>

            {/* ======== NỘI DUNG TRANG SẼ ĐƯỢC CHÈN VÀO ĐÂY ======== */}
            <main>
                {children}
            </main>

            {/* ======== FOOTER ======== */}
            <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-20">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Col 1 */}
                    <div>
                        <h4 className="text-3xl font-black mb-4 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">⚡ SHOP</h4>
                        <p className="text-gray-300 leading-relaxed">Phong cách trẻ trung, hiện đại. Cập nhật xu hướng mới nhất mỗi ngày.</p>
                    </div>
                    {/* Col 2 */}
                    <div>
                        <h4 className="text-lg font-black text-white mb-4">📋 CHÍNH SÁCH</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">✓ Chính sách đổi trả</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">✓ Chính sách vận chuyển</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">✓ Chính sách bảo mật</a></li>
                        </ul>
                    </div>
                    {/* Col 3 */}
                    <div>
                        <h4 className="text-lg font-black text-white mb-4">👥 THEO DÕI CHÚNG TÔI</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-blue-400 hover:translate-x-1 transition-all">📘 Facebook</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 hover:translate-x-1 transition-all">📷 Instagram</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-black hover:translate-x-1 transition-all">🎵 Tiktok</a></li>
                        </ul>
                    </div>
                    {/* Col 4 */}
                    <div>
                        <h4 className="text-lg font-black text-white mb-4">💌 NHẬN TIN KHUYẾN MÃI</h4>
                        <p className="text-gray-300 mb-3">Nhận mã giảm giá và thông tin sale mới nhất!</p>
                        <input
                            type="email"
                            placeholder="Email của bạn..."
                            className="w-full bg-gray-700 border-2 border-violet-500 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 font-semibold"
                        />
                    </div>
                </div>
                <div className="text-center text-gray-400 border-t border-gray-700 pt-8 mt-8 font-semibold">
                    &copy; 2025 Shop Quần Áo - Nơi bạn tìm thấy phong cách của riêng mình ✨
                </div>
            </footer>
        </div>
    );
}