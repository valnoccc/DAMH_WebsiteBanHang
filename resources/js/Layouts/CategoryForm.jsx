import React from 'react';
import { useForm } from '@inertiajs/react';

export default function CategoryForm({ category = {}, parents = [], onSubmit, isEdit = false }) {
    // Khởi tạo form với dữ liệu có sẵn (nếu là Edit) hoặc rỗng (nếu là Create)
    const { data, setData, processing, errors } = useForm({
        ten_danh_muc: category.ten_danh_muc || '',
        parent_id: category.parent_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data); // Gọi hàm onSubmit được truyền từ trang cha
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ô nhập tên danh mục */}
            <div>
                <label className="block font-bold mb-1 text-gray-700">Tên danh mục <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    value={data.ten_danh_muc}
                    onChange={e => setData('ten_danh_muc', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Nhập tên danh mục (VD: Áo Sơ Mi)"
                    required
                />
                {errors.ten_danh_muc && <p className="text-red-500 text-sm mt-1">{errors.ten_danh_muc}</p>}
            </div>

            {/* Ô chọn danh mục cha */}
            <div>
                <label className="block font-bold mb-1 text-gray-700">Danh mục cha (Tùy chọn)</label>
                <select
                    value={data.parent_id}
                    onChange={e => setData('parent_id', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                    <option value="">-- Không có (Là danh mục gốc) --</option>
                    {parents.map(p => (
                        <option key={p.id} value={p.id}>{p.ten_danh_muc}</option>
                    ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                    Chọn danh mục cha nếu đây là danh mục con.
                </p>
                {errors.parent_id && <p className="text-red-500 text-sm mt-1">{errors.parent_id}</p>}
            </div>

            {/* Nút Submit */}
            <button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
                {processing ? 'Đang xử lý...' : (isEdit ? 'Cập Nhật Danh Mục' : 'Tạo Danh Mục Mới')}
            </button>
        </form>
    );
}