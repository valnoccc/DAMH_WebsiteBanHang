import React from 'react';
import { Link, useForm } from '@inertiajs/react';
// Giả sử bạn có AdminLayout, hãy thay thế bằng Layout thực tế của bạn
import AdminLayout from '@/Layouts/AdminLayout'; 

export default function ProductIndex({ products }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            destroy(route('admin.products.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-white shadow rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
                    <Link 
                        href={route('admin.products.create')} 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Thêm Sản phẩm
                    </Link>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="p-3">ID</th>
                            <th className="p-3">Hình ảnh</th>
                            <th className="p-3">Tên sản phẩm</th>
                            <th className="p-3">Danh mục</th>
                            <th className="p-3">Giá gốc</th>
                            <th className="p-3 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map(product => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{product.id}</td>
                                <td className="p-3">
                                    <img 
                                        src={product.hinh_anh?.[0]?.url || '/placeholder.png'} 
                                        alt="" 
                                        className="w-12 h-12 object-cover rounded border"
                                    />
                                </td>
                                <td className="p-3 font-semibold">{product.ten_san_pham}</td>
                                <td className="p-3">{product.danh_muc?.ten_danh_muc || 'N/A'}</td>
                                <td className="p-3">{Number(product.gia_goc).toLocaleString()}đ</td>
                                <td className="p-3 text-right space-x-2">
                                    <button className="text-blue-600 hover:underline">Sửa</button>
                                    <button 
                                        onClick={() => handleDelete(product.id)} 
                                        className="text-red-600 hover:underline"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* Pagination Link ở đây nếu cần */}
            </div>
        </AdminLayout>
    );
}