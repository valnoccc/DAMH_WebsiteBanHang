import { Link, usePage, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import Navigation from '../Components/Navigation';

// Layout chung
export default function AppLayout({ children }) {
    const { auth, cartCount } = usePage().props;

    const [profileOpen, setProfileOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            router.get('/san-pham', { search: searchInput }, { preserveScroll: true });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* ===== HEADER ===== */}
            <header className="sticky top-0 z-50 bg-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-3xl font-black bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent hover:scale-110 transition-transform"
                    >
                        MinhBell Fashion
                    </Link>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="relative w-1/2 hidden md:block">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full border-2 border-primary-200 rounded-full py-3 px-5 focus:outline-none focus:border-accent-500 bg-gradient-to-r from-primary-50 to-accent-50 font-semibold"
                            />
                            <button type="submit" className="text-gray-500 px-4 py-3">
                                <FaSearch size={22} />
                            </button>
                        </div>
                    </form>

                    {/* User + Cart */}
                    <div className="flex items-center space-x-6">
                        {auth?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="text-gray-400 hover:scale-125 transition-all"
                                >
                                    <FaUser size={22} />
                                </button>

                                {profileOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="px-4 py-3 border-b">
                                            <p className="font-semibold text-sm">{auth.user.name}</p>
                                            <p className="text-xs text-gray-500">{auth.user.email}</p>
                                        </div>

                                        <Link href="/profile" className="block px-4 py-3 hover:bg-gray-100">
                                            Hồ sơ
                                        </Link>

                                        <Link href="/orders" className="block px-4 py-3 hover:bg-gray-100">
                                            Đơn hàng
                                        </Link>

                                        <button
                                            onClick={() => router.post('/logout')}
                                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 border-t"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-3">
                                <Link href="/login" className="px-4 py-2 bg-gray-100 rounded-lg">
                                    Đăng nhập
                                </Link>
                                <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                    Đăng ký
                                </Link>
                            </div>
                        )}

                        <Link href="/cart" className="relative text-gray-400 hover:scale-125 transition-all">
                            <FaShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                <Navigation />
            </header>

            {/* ===== CONTENT ===== */}
            <main>{children}</main>

            {/* ===== FOOTER ===== */}
            <footer className="bg-gray-900 text-white py-16 mt-20">
                <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
                    <div>
                        <h4 className="font-bold mb-4">VỀ CHÚNG TÔI</h4>
                        <p className="text-gray-400">Thương hiệu thời trang uy tín.</p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">CHÍNH SÁCH</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Chính sách đổi trả</li>
                            <li>Chính sách vận chuyển</li>
                            <li>Chính sách bảo mật</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">THEO DÕI</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Tiktok</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">NHẬN KHUYẾN MÃI</h4>
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            className="w-full bg-gray-700 border rounded-lg px-4 py-2"
                        />
                    </div>
                </div>

                <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-6">
                    © 2025 MinhBell Fashion
                </div>
            </footer>
        </div>
    );
}
