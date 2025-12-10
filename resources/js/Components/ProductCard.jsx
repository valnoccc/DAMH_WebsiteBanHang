import React from 'react';
import { Link } from '@inertiajs/react';
import { formatCurrency, getProductImage } from '@/utils'; // Import từ file utils

export default function ProductCard({ product }) {
    return (
        <Link href={`/product/${product.slug}`} key={product.id} className="group block">
            <div className="overflow-hidden rounded-lg">
                <img 
                    src={getProductImage(product.hinh_anh)} 
                    alt={product.ten_san_pham} 
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
            </div>
            <div className="mt-4 text-center">
                <h3 className="text-md font-semibold text-gray-800 truncate">{product.ten_san_pham}</h3>
                <p className="mt-1 text-lg font-bold text-gray-900">
                    {formatCurrency(product.gia_goc)}
                </p>
            </div>
        </Link>
    );
}