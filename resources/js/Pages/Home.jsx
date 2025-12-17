<<<<<<< HEAD
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

// Hàm để lấy ảnh (được định nghĩa trực tiếp trong file này)
const getProductImage = (hinhAnhArray) => {
    if (!hinhAnhArray || hinhAnhArray.length === 0) {
        return 'https://via.placeholder.com/400';
    }
    const thumbnail = hinhAnhArray.find(img => img.is_thumbnail);
    // Nếu có URL thì trả về, không thì ảnh dự phòng
    const url = (thumbnail || hinhAnhArray[0])?.url;
    return url || 'https://via.placeholder.com/400';
};

// Hàm định dạng tiền (được định nghĩa trực tiếp trong file này)
const formatCurrency = (number) => {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(number);
};


export default function Home({ products }) {
    
    // (Kiểm tra dữ liệu trong F12 Console)
    console.log(products);

=======
import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { getProductImage, formatCurrency } from '@/utils';


export default function Home({ products }) {

    console.log(products);

    // ================== BANNER SLIDER LOGIC ==================
    const bannerImages = [
        '/images/banner1.jpg',
        '/images/banner2.jpg',
        '/images/banner3.jpg',
        '/images/banner4.jpg'
    ];

    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    // Auto slide banner every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleBannerNext = () => {
        setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    };

    const handleBannerPrev = () => {
        setCurrentBannerIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    // ================== SLIDER LOGIC ==================
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;

    const totalProducts = products.length;

    let visibleProducts = products.slice(
        currentIndex,
        currentIndex + itemsPerPage
    );

    if (visibleProducts.length < itemsPerPage) {
        visibleProducts = [
            ...visibleProducts,
            ...products.slice(0, itemsPerPage - visibleProducts.length)
        ];
    }

    const handleNext = () => {
        setCurrentIndex(prev => (prev + itemsPerPage) % totalProducts);
    };

    const handlePrev = () => {
        setCurrentIndex(prev =>
            (prev - itemsPerPage + totalProducts) % totalProducts
        );
    };

    // ==================================================

>>>>>>> UserFeatures
    return (
        <AppLayout>
            <Head title="Trang Chủ" />

<<<<<<< HEAD
            {/* ======== HERO SECTION (BANNER TRƯỢT) ======== */}
            <section className="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 h-[500px] flex items-center justify-center text-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-72 h-72 bg-white opacity-10 rounded-full -bottom-16 -right-16 animate-pulse" style={{animationDelay: '1s'}}></div>
                
                <div className="text-white z-10">
                    <h1 className="text-6xl font-black mb-4 drop-shadow-lg animate-bounce" style={{animationDelay: '0s'}}>NEW SUMMER VIBES 🌞</h1>
                    <p className="text-2xl mb-8 drop-shadow-md font-semibold">Bộ sưu tập Hè mới nhất đã có mặt - Siêu hot!</p>
                    <Link 
                        href="/products?category=new"
                        className="inline-block bg-white text-violet-600 py-4 px-10 rounded-full font-black text-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 hover:bg-yellow-300"
                    >
                        🛍️ Mua Ngay
                    </Link>
                </div>
            </section>

            {/* ======== DANH MỤC NỔI BẬT (Phong cách Moji) ======== */}
            <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-white to-orange-50">
                <h2 className="text-4xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">🎯 Danh Mục Nổi Bật</h2>
                <p className="text-center text-gray-600 mb-12 text-lg">Khám phá những bộ sưu tập tuyệt vời nhất!</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Item 1 */}
                    <Link href="/san-pham?danh_muc_id=1" className="group block">
                        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <img src="https://via.placeholder.com/400/E2E8F0/333?text=Quần+Áo" alt="Quần Áo" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
                                <h3 className="text-white text-3xl font-black drop-shadow-lg">👕 Quần Áo</h3>
                            </div>
                        </div>
                    </Link>
                    {/* Item 2 */}
                    <Link href="/san-pham?danh_muc_id=2" className="group block">
                        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <img src="https://via.placeholder.com/400/E2E8F0/333?text=Giày" alt="Giày" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
                                <h3 className="text-white text-3xl font-black drop-shadow-lg">👟 Giày</h3>
                            </div>
                        </div>
                    </Link>
                    {/* Item 3 */}
                    <Link href="/san-pham" className="group block">
                        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <img src="https://via.placeholder.com/400/E2E8F0/333?text=Khăn+Choàng" alt="Khăn Choàng" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
                                <h3 className="text-white text-3xl font-black drop-shadow-lg">🧣 Phụ Kiện</h3>
                            </div>
                        </div>
                    </Link>
                    {/* Item 4 */}
                    <Link href="/san-pham?sale=true" className="group block">
                        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-red-500 to-orange-500">
                            <img src="https://via.placeholder.com/400/FECACA/B91C1C?text=SALE" alt="Sale" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125 opacity-70" />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-700/50 to-transparent flex items-center justify-center">
                                <h3 className="text-white text-4xl font-black drop-shadow-lg animate-pulse">🔥 SALE</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* ======== SẢN PHẨM MỚI VỀ (Lấy từ DB) ======== */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">✨ Hàng Mới Về</h2>
                <p className="text-center text-gray-600 mb-12 text-lg">Những sản phẩm hot trending đang chờ bạn!</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                    
                    {/* Code Thẻ Sản Phẩm được viết trực tiếp ở đây */}
                    {products && products.map((product) => (
                        <Link href={`/product/${product.slug}`} key={product.id} className="group block">
                            <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                                <div className="relative overflow-hidden h-80">
                                    <img 
                                        src={getProductImage(product.hinh_anh)} 
                                        alt={product.ten_san_pham} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" 
                                    />
                                    <div className="absolute top-2 right-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">NEW</div>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-md font-bold text-gray-800 truncate group-hover:text-violet-600 transition">{product.ten_san_pham}</h3>
                                <p className="mt-2 text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
                                    {formatCurrency(product.gia_goc)}
                                </p>
                            </div>
                        </Link>
                    ))}

                </div>
            </section>
            
            {/* ======== BANNER QUẢNG CÁO (SHOP THE LOOK) ======== */}
            <section className="container mx-auto px-4 py-20">
                <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 rounded-3xl p-10 md:p-16 text-center md:flex md:items-center md:justify-between md:text-left shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                    <div>
                        <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg">🌟 Shop The Look</h2>
                        <p className="text-lg text-white font-semibold mb-6 md:mb-0 drop-shadow">Tìm cảm hứng thời trang và mua cả bộ đồ xu hướng!</p>
                    </div>
                    <Link 
                        href="/shop-the-look"
                        className="inline-block bg-white text-rose-600 py-4 px-10 rounded-full font-black text-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 hover:bg-yellow-300"
                    >
                        👀 Xem Ngay
=======
            {/* ======== HERO SECTION - BANNER SLIDER ======== */}
            <section className="relative h-[500px] overflow-hidden group">
                {/* Banner Images with Smooth Transition */}
                {bannerImages.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            idx === currentBannerIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${img}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>
                ))}

                

                {/* Left Arrow Button */}
                <button
                    onClick={handleBannerPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 font-black text-2xl w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                >
                    ‹
                </button>

                {/* Right Arrow Button */}
                <button
                    onClick={handleBannerNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 font-black text-2xl w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                >
                    ›
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {bannerImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentBannerIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                idx === currentBannerIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                        ></button>
                    ))}
                </div>
            </section>

            {/* ======== DANH MỤC NỔI BẬT ======== */}
            <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-white to-orange-50">
                <h2 className="text-4xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                    Danh Mục Nổi Bật
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Khám phá những bộ sưu tập tuyệt vời nhất!
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Link href="/san-pham?danh_muc_id=1" className="group block">
                        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square hover:-translate-y-2 transition-all duration-300">
                            <img src="../images/ao-so-mi-trang-3.jpg" className="w-full h-full object-cover group-hover:scale-125 transition" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white text-3xl font-black">Quần Áo</h3>
                            </div>
                        </div>
                    </Link>
                    <Link href="/san-pham?danh_muc_id=2" className="group block">
                        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square hover:-translate-y-2 transition-all duration-300">
                            <img src="../images/giay-nike-authentic-1.jpg" className="w-full h-full object-cover group-hover:scale-125 transition" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white text-3xl font-black">Giày</h3>
                            </div>
                        </div>
                    </Link>
                    <Link href="/san-pham" className="group block">
                        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square hover:-translate-y-2 transition-all duration-300">
                            <img src="../images/khan-choang-co-be-1.jpg" className="w-full h-full object-cover group-hover:scale-125 transition" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white text-3xl font-black">Phụ Kiện</h3>
                            </div>
                        </div>
                    </Link>
                    <Link href="/san-pham?sale=true" className="group block">
                        <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-square hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-red-500 to-orange-500">
                            <img src="../images/chan-vay-be-1.jpg" className="opacity-70 w-full h-full object-cover group-hover:scale-125 transition" />
                            <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center">
                                <h3 className="text-white text-4xl font-black animate-pulse">SALE</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* ======== SLIDER SẢN PHẨM MỚI VỀ ======== */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                    Hàng Mới Về
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Những sản phẩm hot trending đang chờ bạn!
                </p>

                <div className="relative">

                    {/* === NÚT TRÁI === */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-2xl px-4 py-3 rounded-full z-10"
                    >
                        ←
                    </button>

                    {/* === LIST 4 SẢN PHẨM === */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10">
                        {visibleProducts.map((product) => (
                            <Link
                                href={`/san-pham/${product.id}`}
                                key={product.id}
                                className="group block"
                            >
                                <div className="overflow-hidden rounded-2xl shadow-lg bg-white hover:-translate-y-2 transition">
                                    <div className="relative h-72 overflow-hidden">
                                        <img
                                            src={getProductImage(product.hinh_anh)}
                                            className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500"
                                        />
                                        <div className="absolute top-2 right-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                            NEW
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <h3 className="font-bold text-gray-800 truncate group-hover:text-primary-600 transition">
                                        {product.ten_san_pham}
                                    </h3>
                                    <p className="mt-2 text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                                        {formatCurrency(product.gia_goc)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* === NÚT PHẢI === */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-2xl px-4 py-3 rounded-full z-10"
                    >
                        →
                    </button>

                </div>
            </section>

            {/* ======== BANNER QUẢNG CÁO ======== */}
            <section className="container mx-auto px-4 py-20">
                    <div className="bg-gradient-to-r from-amber-400 via-accent-400 to-rose-400 rounded-3xl p-10 md:p-16 shadow-2xl text-center md:flex md:items-center md:justify-between hover:scale-105 transition">
                    <div>
                        <h2 className="text-4xl font-black text-white mb-2">Shop The Look</h2>
                        <p className="text-lg text-white mb-6 md:mb-0">
                            Tìm cảm hứng thời trang và mua cả bộ đồ xu hướng!
                        </p>
                    </div>
                    <Link
                        href="/shop-the-look"
                        className="bg-white text-rose-600 py-4 px-10 rounded-full font-black text-lg hover:scale-110 transition-all hover:bg-yellow-300"
                    >
                        Xem Ngay
>>>>>>> UserFeatures
                    </Link>
                </div>
            </section>

        </AppLayout>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> UserFeatures
