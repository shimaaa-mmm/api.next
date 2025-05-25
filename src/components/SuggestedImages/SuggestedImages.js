"use client";

import Link from "next/link";
import ArticleImageClient from "../../utils/ArticleImageClient";

export default function SuggestedImages({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center col-span-3 text-gray-500">
        عکسی برای این مقاله موجود نیست.
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-6
         w-full mx-auto
         justify-items-center
         sm:w-auto sm:mx-0
         lg:w-[121%] lg:mr-[-95px]"
    >
      {images.map((item, i) => (
        <Link
          key={item.id}
          href={`/articles/${item.id}`}
          className="relative w-full max-w-[366px] h-[332px] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
        >
          <ArticleImageClient
            src={item.thumbnail}
            alt={item.title || `تصویر ${i + 1}`}
            className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
          />
          <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm py-3 px-2">
            <div className="text-black text-[15px] font-bold">{item.title}</div>
            <div className="text-black text-[13px]">
              {new Date(item.createDateTime_InUtc).toLocaleDateString("fa-IR")}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
