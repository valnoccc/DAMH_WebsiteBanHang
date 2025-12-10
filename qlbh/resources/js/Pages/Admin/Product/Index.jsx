import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

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
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                       <FaPlus />Thêm Sản phẩm
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
                                <td className="p-3 text-right">              
                                    <div className="flex items-center justify-end gap-2">

                                        <Link
                                            href={route('admin.products.edit', product.id)}
                                           className="p-2 bg-white border border-gray-200 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                                        >
                                            <FaEdit />
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(product.id)}
                                           className="p-2 bg-white border border-gray-200 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                                        >
                                            <FaTrash />
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination Link*/}
                <div className="mt-6">
                    <Pagination links={products.links} />
                </div>

            </div>
        </AdminLayout>
    );
}