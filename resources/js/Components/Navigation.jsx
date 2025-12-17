import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navigation() {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="bg-gray-800 text-white sticky top-[113px] z-40">
            <div className="container mx-auto px-4">
                {/* Desktop Menu */}
                <div className="hidden md:flex justify-center space-x-10 py-3">
                    <Link
                        href="/"
                        className="font-semibold hover:text-gray-300 transition-colors"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        href="/san-pham"
                        className="font-semibold hover:text-gray-300 transition-colors"
                    >
                        Sản phẩm
                    </Link>
                    <Link
                        href="/san-pham?danh_muc_id=1"
                        className="font-semibold hover:text-gray-300 transition-colors"
                    >
                        Thời trang nam
                    </Link>
                    <Link
                        href="/san-pham?danh_muc_id=2"
                        className="font-semibold hover:text-gray-300 transition-colors"
                    >
                        Thời trang nữ
                    </Link>
                    <Link
                        href="/san-pham?danh_muc_id=8"
                        className="font-semibold hover:text-gray-300 transition-colors"
                    >
                        Phụ kiện
                    </Link>
                    <Link
                        href="/san-pham?danh_muc_id=7"
                        className="font-semibold hover:text-gray-300 transition-colors"
                    >
                        Giày
                    </Link>
                    {auth.user && auth.user.role === 'admin' && (
                        <Link
                            href="/admin"
                            className="font-semibold hover:text-gray-300 transition-colors"
                        >
                            Admin
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex justify-between items-center py-3">
                    <span className="font-semibold">Menu</span>
                    <button
                        onClick={toggleMenu}
                        className="text-white text-2xl hover:text-gray-300 transition-colors"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="md:hidden bg-gray-700 py-3 space-y-2 border-t border-gray-600">
                        <Link
                            href="/"
                            className="block px-4 py-2 font-semibold hover:bg-gray-600 rounded transition-colors"
                            onClick={closeMenu}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            href="/san-pham"
                            className="block px-4 py-2 font-semibold hover:bg-gray-600 rounded transition-colors"
                            onClick={closeMenu}
                        >
                            Sản phẩm
                        </Link>
                        <Link
                            href="/san-pham?danh_muc_id=1"
                            className="block px-4 py-2 font-semibold hover:bg-gray-600 rounded transition-colors"
                            onClick={closeMenu}
                        >
                            Thời trang nam
                        </Link>
                        <Link
                            href="/san-pham?danh_muc_id=2"
                            className="block px-4 py-2 font-semibold hover:bg-gray-600 rounded transition-colors"
                            onClick={closeMenu}
                        >
                            Thời trang nữ
                        </Link>
                        <Link
                            href="/san-pham?danh_muc_id=3"
                            className="block px-4 py-2 font-semibold hover:bg-gray-600 rounded transition-colors"
                            onClick={closeMenu}
                        >
                            Phụ kiện
                        </Link>
                        <Link
                            href="/san-pham?sale=true"
                            className="block px-4 py-2 font-semibold text-red-400 hover:bg-gray-600 rounded transition-colors"
                            onClick={closeMenu}
                        >
                            SALE
                        </Link>
                        {auth.user && auth.user.role === 'admin' && (
                            <Link
                                href="/admin"
                                className="block px-4 py-2 font-semibold hover:bg-gray-600 rounded transition-colors"
                                onClick={closeMenu}
                            >
                                Admin
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
