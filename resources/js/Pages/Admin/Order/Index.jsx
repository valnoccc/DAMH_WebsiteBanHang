import React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';

// Map trạng thái sang tiếng Việt và màu sắc
const statusMap = {
    pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
    processing: { label: 'Đang chuẩn bị', color: 'bg-blue-100 text-blue-800' },
    shipped: { label: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
    completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
};

export default function OrderIndex({ orders }) {
    return (
        <AdminLayout>
            <div className="p-6 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý Đơn hàng</h1>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm border-b-2 border-gray-200">
                                <th className="p-4">Mã Đơn</th>
                                <th className="p-4">Thông tin nhận hàng</th>
                                <th className="p-4">Tổng tiền</th>
                                <th className="p-4">Trạng thái</th>
                                <th className="p-4">Ngày đặt</th>
                                <th className="p-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-bold text-gray-600">#{order.id}</td>
                                    <td className="p-4 max-w-xs truncate" title={order.dia_chi_giao_hang}>
                                        {/* Cắt chuỗi địa chỉ dài để hiển thị gọn */}
                                        {order.dia_chi_giao_hang}
                                    </td>
                                    <td className="p-4 font-mono font-bold text-black">
                                        {Number(order.tong_tien).toLocaleString()}₫
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusMap[order.trang_thai]?.color}`}>
                                            {statusMap[order.trang_thai]?.label}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link 
                                            href={route('admin.orders.show', order.id)}
                                            className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-bold hover:bg-blue-700 transition-colors"
                                        >
                                            Chi tiết
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6">
                    <Pagination links={orders.links} />
                </div>
            </div>
        </AdminLayout>
    );
}