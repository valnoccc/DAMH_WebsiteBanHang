import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import { FaCar } from 'react-icons/fa';

export default function CartIndex({ cartItems, total, itemCount }) {
    const { delete: deleteItem, post } = useForm();

    const removeLocalCartItem = (itemKey) => {
        try {
            const cart = JSON.parse(sessionStorage.getItem('cart') || '{}');
            if (cart[itemKey]) {
                delete cart[itemKey];
                sessionStorage.setItem('cart', JSON.stringify(cart));
            }
        } catch (e) {
            sessionStorage.removeItem('cart');
        }
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const clearLocalCart = () => {
        sessionStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleRemove = (itemKey) => {
        if (!confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) return;
        router.delete(route('cart.destroy', itemKey), {
            onSuccess: () => {
                removeLocalCartItem(itemKey);
            },
            onError: () => {
                // fallback: still attempt to remove locally
                removeLocalCartItem(itemKey);
            }
        });
    };

    const handleUpdateQuantity = (itemKey, newQuantity) => {
        if (newQuantity < 1) return;
        router.patch(route('cart.update', itemKey), { quantity: newQuantity }, {
            onSuccess: () => {
                // quantity change doesn't affect the count badge (unique items), nothing to do
            }
        });
    };

    const handleClearCart = () => {
        if (confirm('Bạn chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
            router.post(route('cart.clear'), {}, {
                onSuccess: () => {
                    clearLocalCart();
                },
                onError: () => {
                    // Best-effort: clear local copy
                    clearLocalCart();
                }
            });
        }
    };

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(number);
    };

    return (
        <AppLayout>
            <Head title="Giỏ Hàng" />
            {console.log('Cart Items:', cartItems)}

            <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white to-orange-50 min-h-screen">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">
                        Giỏ Hàng
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Bạn có <span className="font-bold text-primary-600">{itemCount} sản phẩm</span> trong giỏ
                    </p>
                </div>

                {cartItems && Object.keys(cartItems).length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Shopping Items - Left Side */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                                {Object.entries(cartItems).map(([itemKey, item]) => (
                                    <div key={itemKey} className="flex gap-4 pb-6 border-b border-gray-200 last:border-0">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                            <img
                                                src={item.hinh_anh_url || '/images/placeholder.png'}
                                                alt={item.ten_san_pham}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                                {item.ten_san_pham}
                                            </h3>

                                            <div className="flex gap-4 text-sm text-gray-600 mb-3">
                                                <span className="px-3 py-1 bg-primary-100 text-black rounded-full font-semibold">
                                                    Size: {item.size}
                                                </span>
                                                <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full font-semibold">
                                                    Màu: {item.color}
                                                </span>
                                            </div>

                                            <p className="text-xl font-black text-black mb-4">
                                                {formatCurrency(item.gia_ban)}
                                            </p>


                                            {/* Quantity Control */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <label className="text-sm font-semibold text-gray-700">Số lượng:</label>
                                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(itemKey, item.quantity - 1)}
                                                        className="px-3 py-1 hover:bg-gray-200 transition-colors font-bold">−</button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        className="w-12 text-center border-0 bg-transparent font-bold focus:outline-none"
                                                        readOnly
                                                    />
                                                    <button
                                                        onClick={() => handleUpdateQuantity(itemKey, item.quantity + 1)}
                                                        className="px-3 py-1 hover:bg-gray-200 transition-colors font-bold">+</button>
                                                </div>
                                            </div>

                                            {/* Total for this item */}
                                            <p className="text-sm text-gray-600 mb-3">
                                                Tổng: <span className="font-bold text-gray-900">
                                                    {formatCurrency(item.gia_ban * item.quantity)}
                                                </span>
                                            </p>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemove(itemKey)}
                                                className=" bg-red-500 px-2 py-1 font-semibold text-sm transition-colors rounded-lg text-white"
                                            >
                                                Xóa sản phẩm
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Clear Cart Button */}
                                <div className="pt-6 border-t border-gray-200">
                                    <button
                                        onClick={handleClearCart}
                                        className="text-gray-600 hover:text-gray-800 font-semibold text-sm transition-colors"
                                    >
                                        Xóa toàn bộ giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary - Right Side */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-lg p-6 sticky top-24">
                                <h3 className="text-2xl font-black text-gray-900 mb-6">
                                    Tóm Tắt Đơn
                                </h3>

                                <div className="space-y-4 pb-6 border-b-2 border-primary-200">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Tạm tính:</span>
                                        <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Vận chuyển:</span>
                                        <span className="font-bold text-gray-900">Miễn phí</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Giảm giá:</span>
                                        <span className="font-bold text-green-600">-0₫</span>
                                    </div>
                                </div>

                                <div className="py-6 border-b-2 border-primary-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                                        <span className="text-2xl font-black ">
                                            {formatCurrency(total)}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-6">
                                    <button className="w-full py-3 bg-blue-600 text-white font-black rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all hover:scale-105 shadow-lg">
                                        Thanh Toán Ngay
                                    </button>
                                    <Link
                                        href="/san-pham"
                                        className="block text-center py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all"
                                    >
                                        Tiếp tục mua sắm
                                    </Link>
                                </div>                       
                            </div>
                        </div>
                    </div>
                ) : (
                    // Empty Cart
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Giỏ hàng của bạn đang trống
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Hãy khám phá những sản phẩm thú vị của chúng tôi
                        </p>
                        <Link
                            href="/san-pham"
                            className="inline-block py-4 px-10 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-black rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all hover:scale-105 shadow-lg text-lg"
                        >
                            Bắt Đầu Mua Sắm
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
