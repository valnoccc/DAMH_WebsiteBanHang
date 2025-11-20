import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Đăng nhập" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
            )}

            <h2 className="text-2xl font-extrabold text-center mb-6">Đăng nhập tài khoản</h2>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        />
                        <span className="ms-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                    </label>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-primary-500 underline hover:text-primary-700"
                        >
                            Quên mật khẩu?
                        </Link>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="ms-4 px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link href={route('register')} className="text-primary-600 font-semibold hover:underline">
                    Đăng ký ngay
                </Link>
            </p>
        </GuestLayout>
    );
}
