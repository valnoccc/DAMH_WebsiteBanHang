import { Link } from '@inertiajs/react';
import React from 'react';

export default function Pagination({ links, className = '' }) {
    // Nếu không có link hoặc chỉ có 1 trang thì không hiển thị
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className={`flex flex-wrap items-center justify-center gap-2 mt-6 ${className}`}>
            {links.map((link, index) => {
                // Xử lý logic hiển thị label
                let label = link.label;
                if (label.includes('&laquo;')) label = '«';
                if (label.includes('&raquo;')) label = '»';
                if (label.includes('Previous')) label = '← Trước';
                if (label.includes('Next')) label = 'Sau →';

                return (
                    link.url === null ? (
                        <div 
                            key={index}
                            className="px-3 py-2 text-gray-400 bg-gray-100 rounded-lg border border-gray-200 cursor-not-allowed opacity-70 text-sm"
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    ) : (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-2 text-sm font-bold rounded-lg border transition-all shadow-sm ${
                                link.active
                                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white border-transparent shadow-md transform scale-105'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300'
                            }`}
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    )
                );
            })}
        </div>
    );
}