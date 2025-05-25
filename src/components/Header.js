"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-300" dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">

        <div className="flex items-center gap-9">
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

          <nav className="hidden md:flex items-center gap-6 pl-5 ml-8 text-gray-700 text-base">
            <div className="relative group cursor-pointer flex items-center border-r h-10 ">
              <span className="text-teXt hover:text-gray-900 mr-6">خدمات</span>
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
          <div className="hidden md:flex items-center gap-2.5">
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

          <button
            type="button"
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="بازکردن منوی موبایل"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <div className="flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="بستن منو"
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col p-6 space-y-6 mt-5 text-center">
          <li>
            <a href="#" className="text-gray-900 text-lg font-semibold">
              خدمات
            </a>
          </li>
          <li>
            <a href="/" className="text-gray-900 text-lg font-semibold">
              آکادمی حقوق
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-900 text-lg font-semibold">
              بلاگ
            </a>
          </li>
          <li className="mt-4 border-t pt-4">
            <button
              type="button"
              className="w-full bg-headerBtt text-gray-900 font-extrabold rounded py-2"
            >
              ورود وکیل
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full bg-headerGee text-white font-extrabold rounded py-2"
            >
              ورود کاربر
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
