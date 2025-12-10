import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    FaDollarSign, FaShoppingCart, FaBoxOpen, FaUsers, FaArrowRight 
} from 'react-icons/fa';

// Import thư viện Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Đăng ký các thành phần biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard({ stats, chartRevenue, chartStatus, recentOrders }) {
    
    // Cấu hình Biểu đồ Doanh thu (Bar Chart)
    const revenueChartData = {
        labels: chartRevenue.labels,
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data: chartRevenue.data,
                backgroundColor: 'rgba(59, 130, 246, 0.8)', // Màu xanh blue-500
                borderRadius: 4,
            },
        ],
    };

    const revenueChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Doanh thu 6 tháng gần nhất' },
        },
    };

    // Cấu hình Biểu đồ Trạng thái (Doughnut Chart)
    const statusChartData = {
        labels: ['Chờ xử lý', 'Đang chuẩn bị', 'Đang giao', 'Hoàn thành', 'Đã hủy'],
        datasets: [
            {
                data: chartStatus.data,
                backgroundColor: [
                    '#FCD34D', // Vàng (Pending)
                    '#60A5FA', // Xanh dương (Processing)
                    '#A78BFA', // Tím (Shipped)
                    '#34D399', // Xanh lá (Completed)
                    '#F87171', // Đỏ (Cancelled)
                ],
                borderWidth: 1,
            },
        ],
    };

    // Helper format tiền
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                {/* 1. HEADER */}
                <div>
                    <h1 className="text-2xl font-black text-gray-800">Tổng Quan Hệ Thống</h1>
                    <p className="text-gray-500">Chào mừng quay trở lại trang quản trị.</p>
                </div>

                {/* 2. STATS CARDS (4 Thẻ thống kê) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Doanh thu */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Tổng Doanh Thu</p>
                            <p className="text-2xl font-black text-green-600 mt-1">{formatCurrency(stats.revenue)}</p>
                        </div>
                        <div className="p-3 bg-green-100 text-green-600 rounded-full text-xl">
                            <FaDollarSign />
                        </div>
                    </div>

                    {/* Card 2: Đơn hàng */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Tổng Đơn Hàng</p>
                            <p className="text-2xl font-black text-blue-600 mt-1">{stats.orders}</p>
                        </div>
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full text-xl">
                            <FaShoppingCart />
                        </div>
                    </div>

                    {/* Card 3: Sản phẩm */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Sản Phẩm</p>
                            <p className="text-2xl font-black text-purple-600 mt-1">{stats.products}</p>
                        </div>
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full text-xl">
                            <FaBoxOpen />
                        </div>
                    </div>

                    {/* Card 4: Khách hàng */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Khách Hàng</p>
                            <p className="text-2xl font-black text-orange-600 mt-1">{stats.users}</p>
                        </div>
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-full text-xl">
                            <FaUsers />
                        </div>
                    </div>
                </div>

                {/* 3. CHARTS SECTION (Biểu đồ) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Biểu đồ Cột (Chiếm 2 phần) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                        <h3 className="font-bold text-gray-700 mb-4">Biểu đồ doanh thu</h3>
                        <div className="h-80 flex items-center justify-center">
                            <Bar options={revenueChartOptions} data={revenueChartData} />
                        </div>
                    </div>

                    {/* Biểu đồ Tròn (Chiếm 1 phần) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-700 mb-4">Tỷ lệ đơn hàng</h3>
                        <div className="h-64 flex items-center justify-center">
                            <Doughnut data={statusChartData} />
                        </div>
                    </div>
                </div>

                {/* 4. RECENT ORDERS (Đơn mới nhất) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-lg">Đơn hàng mới nhất</h3>
                        <Link href="/admin/orders" className="text-gray-600 text-sm font-bold hover:underline flex items-center gap-1">
                            Xem tất cả
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-3">Mã đơn</th>
                                    <th className="px-6 py-3">Khách hàng</th>
                                    <th className="px-6 py-3">Tổng tiền</th>
                                    <th className="px-6 py-3">Trạng thái</th>
                                    <th className="px-6 py-3">Ngày đặt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono text-gray-600">#{order.id}</td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{order.user?.name || 'Khách vãng lai'}</td>
                                        <td className="px-6 py-4 text-green-600 font-bold">{formatCurrency(order.tong_tien)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                                ${order.trang_thai === 'completed' ? 'bg-green-100 text-green-700' : 
                                                  order.trang_thai === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                                  order.trang_thai === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {order.trang_thai.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                            Chưa có đơn hàng nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}