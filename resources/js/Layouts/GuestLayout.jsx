<<<<<<< HEAD
import ApplicationLogo from '@/Components/ApplicationLogo';
=======
>>>>>>> UserFeatures
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
<<<<<<< HEAD
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
=======
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-orange-50 pt-8 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="text-4xl font-black bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent hover:scale-110 transition-transform drop-shadow-md">
                    MinhBell Fashion
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden card-surface px-6 py-6 shadow-lg sm:max-w-md sm:rounded-2xl">
>>>>>>> UserFeatures
                {children}
            </div>
        </div>
    );
}
