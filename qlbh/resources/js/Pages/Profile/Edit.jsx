import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';
import { TiUser } from "react-icons/ti";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout>
            <Head title="Hồ Sơ Cá Nhân" />

            {/* ======== HERO SECTION ======== */}
           

            {/* ======== PROFILE CONTENT ======== */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ======== SIDEBAR ======== */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-5xl">
                                    <TiUser size={64}/>
                                </div>
                                <h3 className="text-xl font-black text-gray-800 mb-2">
                                    Tài Khoản Của Bạn
                                </h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Cập nhật thông tin cá nhân
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-primary-50 rounded-lg p-3">
                                        <p className="text-xs text-gray-600 uppercase font-bold">Trạng Thái</p>
                                        <p className="text-green-600 font-bold mt-1">Đã Xác Minh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ======== MAIN CONTENT ======== */}
                    <div className="lg:col-span-2">
                        {/* SECTION 1: Thông Tin Cá Nhân */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <div className="border-b-2 border-primary-200 pb-6 mb-6">
                                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                                    Thông Tin Cá Nhân
                                </h2>
                                <p className="text-gray-600 mt-2 text-sm">
                                    Cập nhật tên và email của bạn
                                </p>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>

                        {/* SECTION 2: Đổi Mật Khẩu */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <div className="border-b-2 border-primary-200 pb-6 mb-6">
                                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                                    Bảo Mật
                                </h2>
                                <p className="text-gray-600 mt-2 text-sm">
                                    Thay đổi mật khẩu của bạn
                                </p>
                            </div>
                            <UpdatePasswordForm />
                        </div>

                        {/* SECTION 3: Xóa Tài Khoản */}
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                            <div className="border-b-2 border-red-300 pb-6 mb-6">
                                <h2 className="text-2xl font-black text-red-600">
                                    Xóa Tài Khoản
                                </h2>
                                <p className="text-gray-600 mt-2 text-sm">
                                    Xóa vĩnh viễn tài khoản của bạn
                                </p>
                            </div>
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
