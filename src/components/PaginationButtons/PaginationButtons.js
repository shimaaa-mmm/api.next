'use client';

export default function PaginationButtons({ pages = [1, 2], onPageClick }) {
    return (
        <div className="flex justify-center mt-11 mb-8 gap-2">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageClick?.(page)}
                    className="px-3 py-1 text-[13px] border border-yellow-300 rounded hover:bg-gray-300"
                >
                    {page}
                </button>
            ))}
        </div>
    );
}
