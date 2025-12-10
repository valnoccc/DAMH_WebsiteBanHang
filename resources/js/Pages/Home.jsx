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

    return (
        <AppLayout>
            <Head title="Trang Chủ" />

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
                    </Link>
                </div>
            </section>

        </AppLayout>
    );
}