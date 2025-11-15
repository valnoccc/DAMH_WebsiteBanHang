import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProductCard from '@/Components/ProductCard'; // <-- Dùng thẻ sản phẩm mới
// (Bạn có thể thêm Pagination sau)

export default function Index({ products, categoryName }) {
    
    return (
        <AppLayout>
            <Head title={categoryName} />

            <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-white to-orange-50">
                
                {/* Tiêu đề trang (khớp với phong cách trang chủ) */}
                <h1 className="text-4xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
                    {categoryName}
                </h1>

                {/* Lưới sản phẩm */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-12">
                    
                    {/* Dùng 'products.data' vì đây là đối tượng đã phân trang */}
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}

                </div>

                {/* (Nơi hiển thị link phân trang sau này) */}
                {/* <Pagination links={products.links} className="mt-12" /> */}
                
            </div>
            
        </AppLayout>
    );
}