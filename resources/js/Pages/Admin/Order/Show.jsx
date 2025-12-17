import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function OrderShow({ order }) {
    const [status, setStatus] = useState(order.trang_thai);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        
        if (confirm(`Bạn có chắc muốn đổi trạng thái thành "${newStatus}" không?`)) {
            router.patch(route('admin.orders.update', order.id), {
                trang_thai: newStatus
            });
        } else {
            setStatus(order.trang_thai); // Reset nếu hủy
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto">
                {/* Header + Back Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Chi tiết đơn hàng #{order.id}
                    </h1>
                    <Link href={route('admin.orders.index')} className="text-gray-600 hover:underline font-medium">
                        Quay lại danh sách
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Cột Trái: Danh sách sản phẩm */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-bold mb-4 border-b pb-2">Sản phẩm đặt mua</h2>
                            <div className="space-y-4">
                                {order.chi_tiet.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <img 
                                            src={item.bien_the?.hinh_anh?.url || '/placeholder.png'} 
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-800">{item.bien_the?.san_pham?.ten_san_pham}</p>
                                            <p className="text-sm text-gray-500">
                                                Phân loại: {item.bien_the?.size} / {item.bien_the?.color}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">x {item.so_luong}</p>
                                            <p className="font-bold text-black">{Number(item.don_gia).toLocaleString()}₫</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t flex justify-between items-center">
                                <span className="font-bold text-gray-600">Tổng cộng:</span>
                                <span className="text-2xl font-black text-red-600">{Number(order.tong_tien).toLocaleString()}₫</span>
                            </div>
                        </div>
                    </div>

                    {/* Cột Phải: Thông tin & Hành động */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Box Cập nhật trạng thái */}
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                            <h2 className="text-lg font-bold mb-4">Cập nhật trạng thái</h2>
                            <select 
                                value={status} 
                                onChange={handleStatusChange}
                                className="w-full border rounded p-2 font-semibold focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Chờ xử lý</option>
                                <option value="processing">Đang chuẩn bị hàng</option>
                                <option value="shipped">Đang giao hàng</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Đã hủy</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-2">
                                Thay đổi sẽ cập nhật ngay lập tức.
                            </p>
                        </div>

                        {/* Box Thông tin khách hàng */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-bold mb-4 border-b pb-2">Thông tin giao hàng</h2>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-500">Thông tin người nhận:</p>
                                    <p className="font-medium text-gray-800 whitespace-pre-line leading-relaxed bg-gray-50 p-2 rounded border">
                                        {/* Vì ta lưu gộp chuỗi, hiển thị nguyên văn sẽ dễ đọc */}
                                        {order.dia_chi_giao_hang.replace(/ \| /g, '\n')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Phương thức thanh toán:</p>
                                    <p className="font-bold">{order.phuong_thuc_thanh_toan}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Ngày đặt hàng:</p>
                                    <p className="font-bold">{new Date(order.created_at).toLocaleString('vi-VN')}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}