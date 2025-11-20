import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';
import { router } from '@inertiajs/react';


export default function ProductDetail({ product }) {
    const [mainImage, setMainImage] = useState(product.hinh_anh?.[0]?.url || '/images/placeholder.png');
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Lấy các size từ biến thể sản phẩm
    const sizes = [...new Set(product.bien_the?.map(b => b.size) || [])];
    const colors = [...new Set(product.bien_the?.map(b => b.color) || [])];

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Vui lòng chọn size');
            return;
        }

        if (!selectedColor) {
            alert('Vui lòng chọn màu sắc');
            return;
        }

        // Tìm biến thể phù hợp (size + color)
        const variant = product.bien_the?.find(
            (v) => v.size === selectedSize && v.color === selectedColor
        );

        if (!variant) {
            alert('Phiên bản sản phẩm không tồn tại!');
            return;
        }

        // Lấy ảnh sản phẩm
        const productImage = product.hinh_anh?.[0]?.url || '/images/placeholder.png';
        
        console.log('Thêm vào giỏ:', {
            san_pham_id: product.id,
            ten_san_pham: product.ten_san_pham,
            hinh_anh_url: productImage,
            product_images: product.hinh_anh
        });

        // Gửi dữ liệu qua backend bằng Inertia
        router.post(route('cart.store'), {
            san_pham_id: product.id,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            gia_ban: variant.gia_ban,
            ten_san_pham: product.ten_san_pham,
            hinh_anh_url: productImage,
        }, {
            onSuccess: () => {
                // Update cart in session storage
                const itemKey = `${product.id}_${selectedSize}_${selectedColor}`;
                const cart = JSON.parse(sessionStorage.getItem('cart') || '{}');
                cart[itemKey] = true;
                sessionStorage.setItem('cart', JSON.stringify(cart));
                
                // Dispatch custom event to update cart count
                window.dispatchEvent(new Event('cartUpdated'));
                
                alert('Đã thêm vào giỏ hàng!');
                setQuantity(1);
                setSelectedSize(null);
                setSelectedColor(null);
            },
            onError: () => {
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            }
        });
    };

    return (
        <AppLayout>
            <Head title={product.ten_san_pham} />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* ===== PHẦN HÌNH ẢNH ===== */}
                    <div>
                        {/* Ảnh chính */}
                        <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={mainImage}
                                alt={product.ten_san_pham}
                                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Ảnh nhỏ */}
                        {product.hinh_anh && product.hinh_anh.length > 0 && (
                            <div className="flex gap-3 overflow-x-auto">
                                {product.hinh_anh.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img.url)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img.url
                                                ? 'border-primary-600'
                                                : 'border-gray-200 hover:border-primary-300'
                                            }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`${product.ten_san_pham} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ===== PHẦN THÔNG TIN ===== */}
                    <div>
                        {/* Breadcrumb */}
                        <div className="mb-4 text-sm text-gray-600">
                            <Link href="/" className="text-primary-600 hover:underline">Trang chủ</Link>
                            <span className="mx-2">›</span>
                            <Link href="/san-pham" className="text-primary-600 hover:underline">Sản phẩm</Link>
                            <span className="mx-2">›</span>
                            <span>{product.ten_san_pham}</span>
                        </div>

                        {/* Tiêu đề */}
                        <h1 className="text-4xl font-black text-gray-900 mb-4">
                            {product.ten_san_pham}
                        </h1>

                        {/* Danh mục */}
                        {product.danh_muc && (
                            <div className="mb-4">
                                <Link
                                    href={`/san-pham?danh_muc_id=${product.danh_muc.id}`}
                                    className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold hover:bg-primary-200 transition-colors"
                                >
                                    {product.danh_muc.ten_danh_muc}
                                </Link>
                            </div>
                        )}

                        {/* Giá */}
                        <div className="mb-6 flex items-baseline gap-4">
                            <span className="text-2xl font-black bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                                {product.gia_goc?.toLocaleString('vi-VN')}₫
                            </span>
                            {product.gia_khuyen_mai && product.gia_khuyen_mai < product.gia_goc && (
                                <span className="text-xl text-gray-400 line-through">
                                    {product.gia_goc?.toLocaleString('vi-VN')}₫
                                </span>
                            )}
                        </div>

                        {/* Mô tả ngắn */}
                        {product.mo_ta && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-600">
                                <p className="text-gray-700 font-semibold">{product.mo_ta}</p>
                            </div>
                        )}

                        {/* Size */}
                        {sizes.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-lg font-bold text-gray-900 mb-3">
                                    Size
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-5 py-3 font-semibold rounded-lg border-2 transition-all ${selectedSize === size
                                                    ? 'border-primary-600 bg-primary-100 text-primary-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Màu */}
                        {colors.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-lg font-bold text-gray-900 mb-3">
                                    Màu sắc
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-5 py-3 font-semibold rounded-lg border-2 transition-all ${selectedColor === color
                                                    ? 'border-primary-600 bg-primary-100 text-primary-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Số lượng */}
                        <div className="mb-3">
                            <label className="block text-lg font-bold text-gray-900 mb-3">
                                Số lượng
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-bold text-lg"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 px-3 py-2 text-center border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none font-bold text-lg"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-bold text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Nút thêm vào giỏ */}
                        <div className="flex gap-4 mb-8">
                            <button className="px-6 py-4 bg-gradient-to-tr from-orange-400 to-yellow-400 text-black font-bold rounded-lg 
    hover:from-yellow-500 hover:to-yellow-500 transition-all">
                                Mua ngay
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className=" px-6 py-4 bg-gray-100 text-gray-700 font-black text-lg rounded-lg hover:bg-gray-200 transition-all"
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <button className="px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-all">
                                Yêu thích
                            </button>
                        </div>

                        {/* Thông tin khác */}
                        <div className="space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-6">
                            <div className="flex justify-between">
                                <span>Mã sản phẩm:</span>
                                <span className="font-semibold text-gray-900">SP-{product.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Trạng thái:</span>
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                    Có sẵn
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Vận chuyển:</span>
                                <span className="font-semibold text-gray-900">Miễn phí (Có điều kiện)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== PHẦN MÔ TẢ CHI TIẾT ===== */}
                <div className="mt-16 border-t-2 border-gray-300 pt-8">
                    <h2 className="text-3xl font-black text-gray-900 mb-6">Chi tiết sản phẩm</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin chung</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li>
                                    <span className="font-semibold">Tên sản phẩm:</span> {product.ten_san_pham}
                                </li>
                                {product.danh_muc && (
                                    <li>
                                        <span className="font-semibold">Danh mục:</span> {product.danh_muc.ten_danh_muc}
                                    </li>
                                )}
                                <li>
                                    <span className="font-semibold">Giá:</span> {product.gia_goc?.toLocaleString('vi-VN')}₫
                                </li>
                                <li>
                                    <span className="font-semibold">Số size có sẵn:</span> {sizes.length}
                                </li>
                                <li>
                                    <span className="font-semibold">Số màu có sẵn:</span> {colors.length}
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-primary-600">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Chính sách bán hàng</h3>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li>Hàng chính hãng 100%</li>
                                <li>Đổi trả trong 7 ngày</li>
                                <li>Giao hàng toàn quốc</li>
                                <li>Hỗ trợ 24/7</li>
                                <li>hanh toán an toàn</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
