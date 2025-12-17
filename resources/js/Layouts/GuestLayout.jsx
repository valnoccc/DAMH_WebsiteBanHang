import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-orange-50 pt-8 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="text-4xl font-black bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent hover:scale-110 transition-transform drop-shadow-md">
                    MinhBell Fashion
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden card-surface px-6 py-6 shadow-lg sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
