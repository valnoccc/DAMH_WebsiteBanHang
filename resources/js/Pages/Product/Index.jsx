<<<<<<< HEAD
import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard'; // <-- Dùng thẻ sản phẩm mới
// (Bạn có thể thêm Pagination sau)

export default function Index({ products, categoryName }) {
    
=======
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
// 1. QUAN TRỌNG: Import router để gửi dữ liệu lên server
import { router } from '@inertiajs/react'; 
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard';
import Pagination from '@/Components/Pagination';

export default function Index({ products, categoryName, categories }) {
    // Lấy tham số từ URL để giữ trạng thái khi F5
    const queryParams = new URLSearchParams(window.location.search);

    // State cho các bộ lọc
    const [selectedCategory, setSelectedCategory] = useState(queryParams.get('danh_muc_id') || '');
    const [selectedColor, setSelectedColor] = useState(queryParams.get('color') || '');
    const [selectedSize, setSelectedSize] = useState(queryParams.get('size') || '');
    
    // 2. QUAN TRỌNG: Thêm state cho giá tiền
    const [minPrice, setMinPrice] = useState(queryParams.get('min_price') || '');
    const [maxPrice, setMaxPrice] = useState(queryParams.get('max_price') || '');

    // 3. HÀM XỬ LÝ KHI NHẤN NÚT ÁP DỤNG
    const handleFilter = () => {
        const params = {
            danh_muc_id: selectedCategory,
            color: selectedColor,
            size: selectedSize,
            min_price: minPrice,
            max_price: maxPrice,
        };

        // Xóa các giá trị rỗng để URL sạch đẹp
        Object.keys(params).forEach(key => {
            if (!params[key]) delete params[key];
        });

        // Gửi yêu cầu lên server
        router.get('/san-pham', params, {
            preserveState: true, 
            preserveScroll: true,
            replace: true, 
        });
    };

>>>>>>> UserFeatures
    return (
        <AppLayout>
            <Head title={categoryName} />

<<<<<<< HEAD
            <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-white to-orange-50">
                
                {/* Tiêu đề trang (khớp với phong cách trang chủ) */}
                <h1 className="text-4xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
                    {categoryName}
                </h1>

                {/* Lưới sản phẩm */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-12">
                    
                    {/* Dùng 'products.data' vì đây là đối tượng đã phân trang */}
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}

                </div>

                {/* (Nơi hiển thị link phân trang sau này) */}
                {/* <Pagination links={products.links} className="mt-12" /> */}
                
            </div>
            
=======
            <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-white to-orange-50 min-h-screen">

                {/* Tiêu đề trang */}
                <h1 className="text-4xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
                    {categoryName}
                </h1>

                {/* Layout 2 cột */}
                <div className="flex flex-col md:flex-row gap-8">

                    {/* === SIDEBAR BỘ LỌC (TRÁI) === */}
                    <aside className="w-full md:w-1/4">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-black mb-6 text-gray-800">Bộ Lọc</h2>

                            {/* Bộ lọc giá */}
                            <div className="mb-6 pb-6 border-b-2 border-gray-200">
                                <label className="block mb-3 font-bold text-gray-800">Khoảng Giá</label>
                                <div className="flex gap-3 mb-3">
                                    {/* 4. SỬA INPUT GIÁ: Thêm value và onChange */}
                                    <input 
                                        type="number" 
                                        placeholder="Từ" 
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-1/2 border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-violet-500 focus:ring-2 transition-all"
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Đến" 
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-1/2 border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-violet-500 focus:ring-2 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Bộ lọc danh mục */}
                            <div className="mb-6 pb-6 border-b-2 border-gray-200">
                                <label className="block mb-3 font-bold text-gray-800">Danh Mục</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className={`w-full px-3 py-2 rounded-lg font-semibold transition-all text-left ${
                                            selectedCategory === '' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                    >
                                        Tất cả
                                    </button>
                                    {categories && categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full px-3 py-2 rounded-lg font-semibold transition-all text-left ${
                                                // So sánh == vì id có thể là số hoặc chuỗi
                                                selectedCategory == category.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                        >
                                            {category.ten_danh_muc}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bộ lọc màu sắc */}
                            <div className="mb-6 pb-6 border-b-2 border-gray-200">
                                <label className="block mb-3 font-bold text-gray-800">Màu Sắc</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Trắng', 'Đen', 'Đỏ', 'Xanh', 'Hồng', 'Vàng', 'Be', 'Xám'].map(color => (
                                        <button
                                            key={color}
                                            // Logic: Nếu đang chọn màu này thì bỏ chọn (về rỗng), ngược lại thì chọn
                                            onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                                            className={`px-3 py-2 rounded-lg font-semibold transition-all border ${
                                                selectedColor === color
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bộ lọc kích thước */}
                            <div className="mb-6 pb-6 border-b-2 border-gray-200">
                                <label className="block mb-3 font-bold text-gray-800">Kích Thước</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                                            className={`px-2 py-2 rounded-lg font-bold text-sm transition-all border ${
                                                selectedSize === size
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Nút áp dụng */}
                            <button 
                                onClick={handleFilter}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-black shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Áp Dụng Bộ Lọc
                            </button>
                        </div>
                    </aside>

                    {/* === DANH SÁCH SẢN PHẨM (PHẢI) === */}
                    <div className="w-full md:w-3/4">
                        {products.data.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.data.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            // Hiển thị khi không có sản phẩm nào
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                                <p className="text-xl text-gray-500 font-semibold">Không tìm thấy sản phẩm phù hợp.</p>
                                <button 
                                    onClick={() => router.get('/san-pham')} 
                                    className="mt-4 text-violet-600 font-bold hover:underline"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        )}

                        {/* Phân trang */}
                        {products.links && <Pagination links={products.links} className="mt-16" />}
                    </div>
                </div>
            </div>
>>>>>>> UserFeatures
        </AppLayout>
    );
}