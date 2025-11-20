import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Đăng ký" />

            <h2 className="text-2xl font-extrabold text-center mb-6">Tạo tài khoản mới</h2>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Họ và tên" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Mật khẩu" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Xác nhận mật khẩu" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <Link href={route('login')} className="text-sm text-gray-600 underline hover:text-gray-900">
                        Đã có tài khoản?
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="ms-4 px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Đăng ký
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
