import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function OrderIndex({ orders }) {

    // Hàm format tiền tệ
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    // Hàm format ngày tháng
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    // Hàm lấy màu sắc và nhãn cho trạng thái đơn hàng
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">Đang chờ xử lý</span>;
            case 'processing':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">Đang chuẩn bị hàng</span>;
            case 'shipped':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">Đang giao hàng</span>;
            case 'completed':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Giao thành công</span>;
            case 'cancelled':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">Đã hủy</span>;
            default:
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
        }
    };

    return (
        <AppLayout>
            <Head title="Đơn hàng của tôi" />

            <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-black text-gray-900 mb-8">Đơn hàng của tôi</h1>

                    {orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white gap-5 rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">

                                    {/* Header của Card Đơn Hàng */}
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Mã đơn hàng</p>
                                            <p className="font-bold text-gray-900 text-start">{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Ngày đặt</p>
                                            <p className="font-medium text-gray-900">{formatDate(order.created_at)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tổng tiền</p>
                                            <p className="font-bold">{formatCurrency(order.tong_tien)}</p>
                                        </div>
                                        <div className="ml-auto">
                                            {getStatusBadge(order.trang_thai)}
                                        </div>
                                    </div>

                                    {/* Danh sách sản phẩm trong đơn */}
                                    <div className="p-6">
                                        {order.chi_tiet.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 mb-4 last:mb-0">
                                                {/* Ảnh sản phẩm */}
                                                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                                                    <img
                                                        src={item.bien_the?.hinh_anh?.url || '/images/placeholder.png'}
                                                        alt={item.bien_the?.san_pham?.ten_san_pham}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Thông tin sản phẩm */}
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800 text-sm md:text-base">
                                                        {item.bien_the?.san_pham?.ten_san_pham || 'Sản phẩm không tồn tại'}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        Phân loại: {item.bien_the?.size} - {item.bien_the?.color}
                                                    </p>
                                                    <div className="flex justify-between mt-1">
                                                        <span className="text-sm">x {item.so_luong}</span>
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {formatCurrency(item.don_gia)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer của Card */}
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            Phương thức thanh toán: <strong className="text-gray-700 uppercase">{order.phuong_thuc_thanh_toan}</strong>
                                        </span>

                                        {/* Bạn có thể thêm nút Xem chi tiết nếu muốn làm trang Order/Show */}
                                        {/* <Link href={`/orders/${order.id}`} className="text-blue-600 font-bold text-sm hover:underline">
                                            Xem chi tiết
                                        </Link> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Giao diện khi chưa có đơn hàng
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                            <div className="text-6xl mb-4"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bạn chưa có đơn hàng nào</h2>
                            <p className="text-gray-500 mb-8">Hãy khám phá các sản phẩm thời trang mới nhất nhé!</p>
                            <Link
                                href="/san-pham"
                                className="inline-block px-8 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 transition-all shadow-lg"
                            >
                                Mua sắm ngay
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}