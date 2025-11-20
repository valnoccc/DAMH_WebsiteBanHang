import { Link } from '@inertiajs/react';
import React from 'react';

export default function Pagination({ links, className = '' }) {
    if (!links || links.length === 0) {
        return null;
    }

    return (
        <div className={`flex items-center justify-center gap-2 mt-12 ${className}`}>
            {links.map((link, index) => {
                // Extract page number from label
                const isActive = link.active;
                const isDisabled = !link.url;

                // Determine if it's prev/next button
                const isPrev = link.label.includes('Previous');
                const isNext = link.label.includes('Next');
                const isPageNumber = !isPrev && !isNext;

                // Display label for prev/next, or just the number for page buttons
                let displayLabel = link.label;
                if (isPageNumber) {
                    displayLabel = link.label.trim();
                } else if (isPrev) {
                    displayLabel = '← Trước';
                } else if (isNext) {
                    displayLabel = 'Sau →';
                }

                if (isDisabled) {
                    // Disabled button
                    return (
                        <button
                            key={index}
                            disabled
                            className="px-3 py-2 text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed opacity-50"
                        >
                            {displayLabel}
                        </button>
                    );
                }

                if (isActive) {
                    // Active page button
                    return (
                        <button
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-black rounded-lg shadow-lg"
                        >
                            {displayLabel}
                        </button>
                    );
                }

                // Regular page/prev/next link
                return (
                    <Link
                        key={index}
                        href={link.url}
                        className="px-4 py-2 border-2 border-primary-300 text-primary-600 font-bold rounded-lg hover:bg-primary-50 hover:border-primary-500 transition-all hover:shadow-md"
                    >
                        {displayLabel}
                    </Link>
                );
            })}
        </div>
    );
}
