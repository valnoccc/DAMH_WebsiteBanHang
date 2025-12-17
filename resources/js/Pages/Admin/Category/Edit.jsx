import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FaArrowLeft } from 'react-icons/fa';

export default function EditCategory({ category, parents }) {
    // Khởi tạo form với dữ liệu của danh mục cần sửa
    const { data, setData, put, processing, errors } = useForm({
        ten_danh_muc: category.ten_danh_muc,
        parent_id: category.parent_id || '', // Nếu null thì set về rỗng để select chọn đúng option đầu
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dùng phương thức PUT để cập nhật
        put(route('admin.categories.update', category.id), {
            onSuccess: () => {
                // Có thể alert hoặc để flash message tự hiện
            }
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Link 
                        href={route('admin.categories.index')} 
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
                        title="Quay lại danh sách"
                    >
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-gray-800">Sửa Danh Mục</h1>
                        <p className="text-sm text-gray-500 font-mono">ID: #{category.id}</p>
                    </div>
                </div>

                {/* Card Form */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Tên danh mục */}
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">
                                Tên danh mục <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                value={data.ten_danh_muc}
                                onChange={e => setData('ten_danh_muc', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Nhập tên danh mục..."
                                required
                            />
                            {errors.ten_danh_muc && <p className="text-red-500 text-sm mt-1">{errors.ten_danh_muc}</p>}
                        </div>

                        {/* Danh mục cha */}
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">Danh mục cha</label>
                            <select 
                                value={data.parent_id}
                                onChange={e => setData('parent_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                            >
                                <option value="">-- Không có (Là danh mục gốc) --</option>
                                {parents.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.ten_danh_muc}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-2">
                                Thay đổi danh mục cha sẽ ảnh hưởng đến vị trí hiển thị trên menu.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                            <Link 
                                href={route('admin.categories.index')}
                                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                            >
                                Hủy bỏ
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                            >
                                {processing ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}