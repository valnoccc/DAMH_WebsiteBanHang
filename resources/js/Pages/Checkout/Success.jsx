import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { FaCheckCircle } from "react-icons/fa";

export default function Success() {
    return (
        <AppLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheckCircle className="text-4xl text-green-500" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-800 mb-4">Đặt hàng thành công!</h1>
                    <p className="text-gray-600 mb-8">
                        Cảm ơn bạn đã mua sắm. Chúng tôi sẽ liên hệ để xác nhận đơn hàng trong thời gian sớm nhất.
                    </p>
                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="block w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800"
                        >
                            Tiếp tục mua sắm
                        </Link>
                        <Link
                            href="/orders"
                            className="block w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-200"
                        >
                            Xem đơn hàng của bạn
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}