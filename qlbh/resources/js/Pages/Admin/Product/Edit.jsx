import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link, router } from '@inertiajs/react'; // Thêm 'router'

export default function EditProduct({ product, categories }) {
    // 1. Khởi tạo form
    const { data, setData, post, processing, errors } = useForm({
        ten_san_pham: product.ten_san_pham,
        slug: product.slug,
        danh_muc_id: product.danh_muc_id,
        gia_goc: product.gia_goc,
        mo_ta: product.mo_ta || '',
        new_images: [],
        variants: product.bien_the.map(v => ({
            id: v.id,
            size: v.size,
            color: v.color,
            price: v.gia_ban,
            stock: v.so_luong_ton
        }))
    });

    const handleNameChange = (e) => {
        const name = e.target.value;
        setData(d => ({ ...d, ten_san_pham: name }));
    };

    const addVariant = () => {
        setData('variants', [...data.variants, { size: '', color: '', price: data.gia_goc, stock: 10 }]);
    };

    const removeVariant = (index) => {
        const newVariants = [...data.variants];
        newVariants.splice(index, 1);
        setData('variants', newVariants);
    };

    // --- ĐÃ SỬA: Cập nhật biến thể an toàn (Immutable) ---
    const handleVariantChange = (index, field, value) => {
        const newVariants = data.variants.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setData('variants', newVariants);
    };

    // --- ĐÃ SỬA: Gửi dữ liệu chuẩn (JSON + FormData) ---
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.products.update', product.id), {
            forceFormData: true, // Bắt buộc để gửi ảnh
            transform: (data) => ({
                ...data,
                // Đóng gói mảng variants thành chuỗi JSON để Backend giải nén
                // Giúp tránh lỗi "Undefined array key"
                variants: JSON.stringify(data.variants),
            }),
        });
    };

    const handleDeleteImage = (imageId) => {
        if (confirm('Bạn có chắc chắn muốn xóa ảnh này không?')) {
            router.delete(route('admin.product-images.destroy', imageId), {
                preserveScroll: true, // Giữ nguyên vị trí cuộn trang
                onSuccess: () => {
                    // Ảnh sẽ tự mất đi vì Inertia tự reload lại props 'product'
                }
            });
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Sửa Sản Phẩm: {product.ten_san_pham}</h1>
                    <Link href={route('admin.products.index')} className="text-gray-600 hover:underline">Quay lại</Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. Thông tin chung */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold mb-1">Tên sản phẩm</label>
                            <input
                                type="text"
                                value={data.ten_san_pham}
                                onChange={handleNameChange}
                                className="w-full border rounded p-2"
                                required
                            />
                            {errors.ten_san_pham && <p className="text-red-500 text-sm">{errors.ten_san_pham}</p>}
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                                className="w-full border rounded p-2 bg-gray-100"
                            />
                            {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold mb-1">Danh mục</label>
                            <select
                                value={data.danh_muc_id}
                                onChange={e => setData('danh_muc_id', e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="">-- Chọn danh mục --</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.ten_danh_muc}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Giá gốc (VNĐ)</label>
                            <input
                                type="number"
                                value={data.gia_goc}
                                onChange={e => setData('gia_goc', e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    {/* 2. Hình ảnh */}
                    <div>
                        <label className="block font-bold mb-2 text-gray-700">Hình ảnh sản phẩm</label>

                        {/* Khu vực hiển thị ảnh CŨ (Đang có trong DB) */}
                        {product.hinh_anh.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Ảnh hiện tại (Nhấn X để xóa):</p>
                                <div className="flex gap-4 overflow-x-auto p-3 bg-gray-50 rounded-lg border border-gray-200 items-center min-h-[100px]">
                                    {product.hinh_anh.map(img => (
                                        <div key={img.id} className="relative flex-shrink-0 group">
                                            {/* Ảnh */}
                                            <img
                                                src={img.url}
                                                alt="Product Image"
                                                className="w-24 h-24 object-cover rounded-md border border-gray-300 shadow-sm bg-white"
                                            />

                                            {/* Nút Xóa (Hiện khi di chuột vào) */}
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(img.id)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md hover:bg-red-600 transition-colors z-10"
                                                title="Xóa ảnh này"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Khu vực chọn ảnh MỚI */}
                        <div className="mt-2">
                            <label className="block text-sm font-semibold mb-1 text-gray-600">Thêm ảnh mới</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*" // Chỉ cho chọn file ảnh
                                onChange={e => setData('new_images', e.target.files)}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                    border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            />
                            <p className="mt-1 text-xs text-gray-500">Giữ phím Ctrl để chọn nhiều ảnh.</p>
                        </div>
                    </div>
                    {/* 3. Biến thể sản phẩm */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Biến thể (Size/Màu)</h3>
                            <button type="button" onClick={addVariant} className="text-blue-600 font-bold border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">+ Thêm biến thể</button>
                        </div>

                        {data.variants.map((variant, index) => (
                            <div key={index} className="flex gap-4 mb-3 items-end bg-gray-50 p-3 rounded">
                                <div>
                                    <label className="text-xs font-bold">Size</label>
                                    <input type="text" value={variant.size} onChange={e => handleVariantChange(index, 'size', e.target.value)} className="w-20 border rounded p-1" required />
                                </div>
                                <div>
                                    <label className="text-xs font-bold">Màu</label>
                                    <input type="text" value={variant.color} onChange={e => handleVariantChange(index, 'color', e.target.value)} className="w-24 border rounded p-1" required />
                                </div>
                                <div>
                                    <label className="text-xs font-bold">Giá bán</label>
                                    <input type="number" value={variant.price} onChange={e => handleVariantChange(index, 'price', e.target.value)} className="w-32 border rounded p-1" required />
                                </div>
                                <div>
                                    <label className="text-xs font-bold">Tồn kho</label>
                                    <input type="number" value={variant.stock} onChange={e => handleVariantChange(index, 'stock', e.target.value)} className="w-20 border rounded p-1" required />
                                </div>
                                <button type="button" onClick={() => removeVariant(index)} className="text-red-500 font-bold pb-1">
                                    {variant.id ? 'X' : 'Xóa'}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* 4. Mô tả */}
                    <div>
                        <label className="block font-bold mb-1">Mô tả chi tiết</label>
                        <textarea
                            rows="4"
                            value={data.mo_ta}
                            onChange={e => setData('mo_ta', e.target.value)}
                            className="w-full border rounded p-2"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 disabled:opacity-50"
                    >
                        {processing ? 'Đang cập nhật...' : 'Lưu Thay Đổi'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}