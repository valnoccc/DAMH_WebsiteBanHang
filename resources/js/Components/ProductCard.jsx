import React from 'react';
import { Link } from '@inertiajs/react';
import { formatCurrency, getProductImage } from '@/utils'; // Import từ file utils

export default function ProductCard({ product }) {
    return (
        <Link href={`/san-pham/${product.id}`} key={product.id} className="group block">
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                    src={getProductImage(product.hinh_anh)}
                    alt={product.ten_san_pham}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="mt-3 text-center">
                <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-primary-600 transition">{product.ten_san_pham}</h3>
                <p className="mt-1 text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                    {formatCurrency(product.gia_goc)}
                </p>
            </div>
        </Link>
    );
}