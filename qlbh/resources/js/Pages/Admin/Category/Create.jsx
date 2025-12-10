import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CreateCategory({ parents }) {
    const { data, setData, post, processing, errors } = useForm({
        ten_danh_muc: '',
        parent_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Thêm Danh Mục Mới</h1>
                    <Link href={route('admin.categories.index')} className="text-gray-600 hover:underline">
                        Quay lại
                    </Link>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Tên danh mục */}
                    <div>
                        <label className="block font-bold mb-1 text-gray-700">
                            Tên danh mục <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            value={data.ten_danh_muc}
                            onChange={e => setData('ten_danh_muc', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tên danh mục..."
                            required
                        />
                        {errors.ten_danh_muc && <p className="text-red-500 text-sm mt-1">{errors.ten_danh_muc}</p>}
                    </div>

                    {/* Danh mục cha */}
                    <div>
                        <label className="block font-bold mb-1 text-gray-700">Danh mục cha (Tùy chọn)</label>
                        <select 
                            value={data.parent_id}
                            onChange={e => setData('parent_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Không có (Là danh mục gốc) --</option>
                            {parents.map(p => (
                                <option key={p.id} value={p.id}>{p.ten_danh_muc}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Chọn nếu đây là danh mục con.
                        </p>
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 disabled:opacity-50 transition-colors"
                    >
                        {processing ? 'Đang lưu...' : 'Lưu Danh Mục'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}