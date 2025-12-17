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

    return (
        <AppLayout>
            <Head title="Trang Chủ" />

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
                    </Link>
                </div>
            </section>

        </AppLayout>
    );
}
