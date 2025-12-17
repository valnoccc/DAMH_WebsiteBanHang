import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '', // <--- THÊM DÒNG NÀY: Lấy sđt cũ hoặc rỗng
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                {/* Name Field */}
                <div>
                    <InputLabel htmlFor="name" value="Tên Đầy Đủ" />
                    <TextInput
                        id="name"
                        className="mt-2 block w-full border-2 border-primary-200 rounded-lg px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-2 block w-full border-2 border-primary-200 rounded-lg px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Số điện thoại" />

                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                        placeholder="Nhập số điện thoại của bạn"
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                {/* Email Verification Notice */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800">
                            Email của bạn chưa được xác minh.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 font-bold text-amber-600 hover:text-amber-700 underline"
                            >
                                Gửi lại email xác minh
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-3 text-sm font-bold text-green-600 bg-green-50 p-2 rounded">
                                Email xác minh đã được gửi!
                            </div>
                        )}
                    </div>
                )}

                {/* Save Button */}
                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-black rounded-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Đang Lưu...' : 'Lưu Thay Đổi'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-green-600">
                            ✓ Lưu thành công
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
