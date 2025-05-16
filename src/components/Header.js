"use client";

import Image from "next/image";

const Header = () => {
  return (
    <header className="border-b border-gray-300" dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="لوگوی سامانه مشاوره حقوقی ج د ل"
              width={100}
              height={47}
            />
            <span className="text-[12px] font-bold text-black mt-1">
              سامانه مشاوره حقوقی
            </span>
          </div>

          <nav className="flex items-center border-r h-10 gap-6 pr-5 mr-8 text-gray-700 text-base">
            <div className="relative group cursor-pointer flex items-center">
              <span className="text-teXt hover:text-gray-900">خدمات</span>
              <i className="fa-solid fa-chevron-down mr-1 text-[10px]"></i>
            </div>
            <a href="/" className="hover:text-gray-900 text-teXt">
              آکادمی حقوق
            </a>
            <a href="#" className="hover:text-gray-900 text-teXt">
              بلاگ
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2.5 space-x-reverse">
          <button
            type="button"
            className="bg-headerBtt text-[14px] w-[90px] h-[35px] font-extrabold text-gray-900 rounded px-4 py-2 flex items-center justify-center hover:bg-headerBtt transition"
          >
            ورود وکیل
          </button>
          <button
            type="button"
            className="bg-headerGee text-white text-[14px] w-[90px] h-[35px] font-extrabold rounded px-4 py-2 flex items-center justify-center hover:bg-headerGee transition"
          >
            ورود کاربر
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;


