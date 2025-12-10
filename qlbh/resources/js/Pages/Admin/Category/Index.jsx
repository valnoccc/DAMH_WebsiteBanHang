import React from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import { FaEdit, FaTrash, FaPlus, FaFolderOpen } from 'react-icons/fa';

export default function CategoryIndex({ categories }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id, name) => {
        if (confirm(`CẢNH BÁO: Bạn có chắc chắn muốn xóa danh mục "${name}"?\n\nLưu ý: Nếu danh mục này có chứa sản phẩm hoặc danh mục con, bạn cần xóa hoặc di chuyển chúng trước.`)) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FaFolderOpen className="text-blue-600" /> Quản lý Danh mục
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Phân loại sản phẩm của cửa hàng</p>
                    </div>
                    
                    <Link 
                        href={route('admin.categories.create')} 
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                        <FaPlus /> Thêm Danh mục
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider border-b border-gray-200">
                                <th className="p-5 w-16 text-center">ID</th>
                                <th className="p-5">Tên Danh Mục</th>
                                <th className="p-5">Danh Mục Cha</th>
                                <th className="p-5 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.data.length > 0 ? (
                                categories.data.map(category => (
                                    <tr key={category.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="p-5 text-center text-gray-400 font-mono font-bold">
                                            #{category.id}
                                        </td>
                                        
                                        <td className="p-5">
                                            {/* Đã xóa icon folder ở đây, chỉ hiển thị tên danh mục */}
                                            <span className="font-bold text-gray-800 text-lg">
                                                {category.ten_danh_muc}
                                            </span>
                                        </td>

                                        <td className="p-5">
                                            {category.parent ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                                                    {category.parent.ten_danh_muc}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                                    Danh mục gốc
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('admin.categories.edit', category.id)}
                                                    className="p-2 bg-white border border-gray-200 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                                                    title="Sửa"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(category.id, category.ten_danh_muc)} 
                                                    className="p-2 bg-white border border-gray-200 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                                                    title="Xóa"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-gray-500 bg-gray-50">
                                        <div className="flex flex-col items-center justify-center">
                                            <FaFolderOpen className="text-5xl text-gray-300 mb-4" />
                                            <p className="text-lg font-medium">Chưa có danh mục nào</p>
                                            <p className="text-sm mt-1">Hãy bắt đầu bằng cách thêm danh mục mới.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {categories.links && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <Pagination links={categories.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}