import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Checkout({ cartItems, total }) {
    // 1. Lấy thông tin user đang đăng nhập từ Inertia
    const user = usePage().props.auth.user;

    // 2. Form chỉ quản lý những gì khách cần nhập thêm
    const { data, setData, post, processing, errors } = useForm({
        dia_chi: user.dia_chi || '', // Lấy địa chỉ mặc định nếu có
        ghi_chu: '',
        phuong_thuc_thanh_toan: 'COD',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/checkout'); 
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    return (
        <AppLayout>
            <Head title="Thanh Toán" />
            
            <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-black text-center mb-10 text-gray-800">Xác Nhận Đơn Hàng</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Box 1: Thông tin người nhận (Lấy từ tài khoản) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-700">
                                Thông tin người nhận
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                                <div>
                                    <p className="text-sm text-gray-500">Họ và tên</p>
                                    <p className="font-bold text-lg">{user.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-semibold">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Số điện thoại</p>
                                    <p className="font-bold text-lg">{user.phone || 'Chưa cập nhật'}</p>
                                </div>
                            </div>
                            {/* Nếu chưa có SĐT, hiện cảnh báo */}
                            {!user.phone && (
                                <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
                                    Bạn chưa cập nhật số điện thoại. Vui lòng cập nhật trong trang Hồ sơ cá nhân trước khi đặt hàng.
                                </div>
                            )}
                        </div>

                        {/* Box 2: Địa chỉ giao hàng (Cần nhập) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                Địa chỉ giao hàng
                            </h2>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Địa chỉ nhận hàng chi tiết <span className="text-red-500">*</span></label>
                                <textarea 
                                    value={data.dia_chi}
                                    onChange={e => setData('dia_chi', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    placeholder="Ví dụ: Số 123, Đường ABC, Phường XYZ, Quận..."
                                    required
                                ></textarea>
                                {errors.dia_chi && <div className="text-red-500 text-sm mt-1">{errors.dia_chi}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Ghi chú cho shipper (Tùy chọn)</label>
                                <textarea 
                                    value={data.ghi_chu}
                                    onChange={e => setData('ghi_chu', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    rows="2"
                                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Box 3: Phương thức thanh toán */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
                            <div className="space-y-3">
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${data.phuong_thuc_thanh_toan === 'COD' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="COD"
                                        checked={data.phuong_thuc_thanh_toan === 'COD'}
                                        onChange={e => setData('phuong_thuc_thanh_toan', e.target.value)}
                                        className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 font-bold text-gray-700">Thanh toán khi nhận hàng (COD)</span>
                                </label>
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${data.phuong_thuc_thanh_toan === 'BANK' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="BANK"
                                        checked={data.phuong_thuc_thanh_toan === 'BANK'}
                                        onChange={e => setData('phuong_thuc_thanh_toan', e.target.value)}
                                        className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 font-bold text-gray-700">Chuyển khoản ngân hàng (QR Code)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG (Giữ nguyên logic hiển thị) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24 border border-gray-100">
                            <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
                            
                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-3 border-b border-gray-100 pb-3 last:border-0">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                                            <img 
                                                src={item.bien_the.hinh_anh?.url || '/images/placeholder.png'} 
                                                className="w-full h-full object-cover" 
                                                alt={item.bien_the.san_pham.ten_san_pham}
                                            />
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <p className="font-bold text-gray-800 line-clamp-1">{item.bien_the.san_pham.ten_san_pham}</p>
                                            <p className="text-gray-500 text-xs mt-1">
                                                Size: <span className="font-medium text-gray-700">{item.bien_the.size}</span> | 
                                                Màu: <span className="font-medium text-gray-700">{item.bien_the.color}</span>
                                            </p>
                                            <div className="flex justify-between mt-2">
                                                <span className="text-gray-600">x {item.so_luong}</span>
                                                <span className="font-bold">{formatCurrency(item.bien_the.gia_ban * item.so_luong)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-t border-gray-200 pt-4 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Tạm tính:</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển:</span>
                                    <span className="text-green-600 font-bold">Miễn phí</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-gray-900 pt-3 border-t border-gray-200 mt-2">
                                    <span>Tổng thanh toán:</span>
                                    <span className="">{formatCurrency(total)}</span>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing || !user.phone} // Chặn đặt hàng nếu chưa có SĐT
                                className={`w-full mt-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95
                                    ${processing || !user.phone 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-xl'
                                    }`}
                            >
                                {processing ? 'Đang xử lý...' : 'XÁC NHẬN ĐẶT HÀNG'}
                            </button>
                            {!user.phone && (
                                <p className="text-xs text-red-500 text-center mt-2">Vui lòng cập nhật số điện thoại</p>
                            )}
                        </div>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}