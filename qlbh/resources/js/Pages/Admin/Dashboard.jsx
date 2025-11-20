import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <p className="text-gray-700">Chỉ dành cho quản trị viên.</p>
            </div>
        </AdminLayout>
    );
}
