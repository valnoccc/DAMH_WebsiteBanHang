import React, { useState } from 'react';
// Import router để gửi dữ liệu thủ công
import { useForm, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CreateProduct({ categories }) {
    // Dùng useForm để quản lý dữ liệu nhập vào
    const { data, setData, processing, errors } = useForm({
        ten_san_pham: '',
        slug: '',
        danh_muc_id: '',
        gia_goc: '',
        mo_ta: '',
        images: [], 
        variants: [ 
            { size: 'M', color: 'Trắng', price: '', stock: 10 }
        ]
    });

    const handleNameChange = (e) => {
        const name = e.target.value;
        const slug = name.toLowerCase()
            .replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a').replace(/[éèẻẽẹêếềểễệ]/g, 'e').replace(/[iíìỉĩị]/g, 'i').replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o').replace(/[úùủũụưứừửữự]/g, 'u').replace(/[ýỳỷỹỵ]/g, 'y').replace(/[đ]/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '') 
            .replace(/\s+/g, '-');
        setData(d => ({ ...d, ten_san_pham: name, slug: slug }));
    };

    const addVariant = () => {
        setData('variants', [...data.variants, { size: '', color: '', price: data.gia_goc, stock: 10 }]);
    };
    
    const removeVariant = (index) => {
        const newVariants = [...data.variants];
        newVariants.splice(index, 1);
        setData('variants', newVariants);
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = data.variants.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setData('variants', newVariants);
    };

    // --- HÀM SUBMIT THỦ CÔNG (MẠNH MẼ NHẤT) ---
    const handleSubmit = (e) => {
        e.preventDefault(); // Chặn reload trang

        // 1. Tự tạo FormData để kiểm soát dữ liệu
        const formData = new FormData();
        
        // 2. Thêm các trường cơ bản
        formData.append('ten_san_pham', data.ten_san_pham);
        formData.append('slug', data.slug);
        formData.append('danh_muc_id', data.danh_muc_id);
        formData.append('gia_goc', data.gia_goc);
        formData.append('mo_ta', data.mo_ta);

        // 3. Thêm File ảnh (Duyệt qua mảng file và append từng cái)
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images[]', data.images[i]);
            }
        }

        // 4. Thêm Biến thể (Đóng gói JSON)
        formData.append('variants', JSON.stringify(data.variants));

        // 5. Gửi bằng router.post
        router.post(route('admin.products.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                alert("Thêm sản phẩm thành công!");
            },
            onError: (err) => {
                console.log("Lỗi Validation:", err);
                // Hiển thị lỗi ra cho user thấy
                let message = "Vui lòng kiểm tra lại thông tin:\n";
                Object.keys(err).forEach(key => {
                    message += `- ${err[key]}\n`;
                });
                alert(message);
            }
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Thêm Sản Phẩm Mới</h1>
                    <Link href={route('admin.products.index')} className="text-gray-600 hover:underline">Quay lại</Link>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* 1. Thông tin chung */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.ten_san_pham}
                                onChange={handleNameChange}
                                className="w-full border rounded p-2"
                            />
                            {errors.ten_san_pham && <p className="text-red-500 text-sm">{errors.ten_san_pham}</p>}
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Slug <span className="text-red-500">*</span></label>
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
                            <label className="block font-bold mb-1">Danh mục <span className="text-red-500">*</span></label>
                            <select 
                                value={data.danh_muc_id}
                                onChange={e => setData('danh_muc_id', e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="">-- Chọn danh mục --</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.ten_danh_muc}</option>
                                ))}
                            </select>
                            {errors.danh_muc_id && <p className="text-red-500 text-sm">Chưa chọn danh mục</p>}
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Giá gốc <span className="text-red-500">*</span></label>
                            <input 
                                type="number" 
                                value={data.gia_goc}
                                onChange={e => setData('gia_goc', e.target.value)}
                                className="w-full border rounded p-2"
                            />
                            {errors.gia_goc && <p className="text-red-500 text-sm">Chưa nhập giá gốc</p>}
                        </div>
                    </div>

                    {/* 2. Upload Hình Ảnh */}
                    <div>
                        <label className="block font-bold mb-1">Hình ảnh (Chọn nhiều)</label>
                        <input 
                            type="file" 
                            multiple
                            accept="image/*"
                            // QUAN TRỌNG: Lấy e.target.files
                            onChange={e => setData('images', e.target.files)}
                            className="w-full border rounded p-2"
                        />
                        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                        {/* Lỗi chi tiết từng ảnh */}
                        {errors['images.0'] && <p className="text-red-500 text-sm">File ảnh không hợp lệ</p>}
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
                                <button type="button" onClick={() => removeVariant(index)} className="text-red-500 font-bold pb-1">Xóa</button>
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
                        {processing ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}