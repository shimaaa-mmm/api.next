"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../../../layouts/Layout";
import ArticleImageClient from "../../../../utils/ArticleImageClient";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ArticleDetail({ params }) {
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const resArticlePromise = fetch(
          `https://api.dev.adlara.ir/Landing/Articles/${id}`,
          { cache: "no-store" }
        ).then((res) => {
          if (!res.ok) throw new Error("خطا در دریافت مقاله");
          return res.json();
        });

        const resImagesPromise = fetch(
          "https://api.dev.adlara.ir/Landing/Articles",
          { cache: "no-store" }
        ).then((res) => {
          if (!res.ok) throw new Error("خطا در دریافت تصاویر");
          return res.json();
        });

        const [articleData, imagesData] = await Promise.all([
          resArticlePromise,
          resImagesPromise,
        ]);

        // اضافه کردن حداقل 2 ثانیه لودینگ
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setArticle(articleData.data);
        setImages(imagesData.data.articles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading)
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]" dir="rtl">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      </Layout>
    );

  if (error || !article)
    return (
      <Layout>
        <div className="text-center mt-10 text-red-500" dir="rtl">
          {error || "مقاله پیدا نشد."}
        </div>
      </Layout>
    );

  let arrangedImages = [];
  if (images.length > 0) {
    const totalImages = images.length;
    const startIndex = article.id % totalImages;

    for (let i = 0; i < 3; i++) {
      arrangedImages.push(images[(startIndex + i * 2) % totalImages]);
    }
  }

  return (
    <Layout>
      <div className="max-w-[60rem] mx-auto p-4 mt-[44px]" dir="rtl">
        <video
          controls
          className="w-full rounded-lg max-w-[700px] max-h-[500px] mx-auto mb-10 border-2 border-black bg-[#adadad]
"
          src={article.videoUrl}
        >
          مرورگر شما تگ ویدیو را پشتیبانی نمی‌کند.
        </video>
        <h1 className="text-[rgb(26,59,112)] font-bold text-[18px] leading-[1.5rem] mb-2 text-right">
          {article.title}
        </h1>

        <p className="mt-6 text-gray-700 leading-[2.1] text-right">
          {article.summary}
        </p>

        <div className="flex justify-start gap-3 text-sm text-gray-500 mb-1 border-b border-gray-300 pb-2">
          <div>
            {new Date(article.createDateTime_InUtc).toLocaleDateString("fa-IR")}
          </div>
        </div>

        <div className="tags mt-6 pt-4 px-4 flex flex-wrap gap-6">
          <span className="bg-[#d9dce1] p-3 text-[14px] -mt-[23px] -mr-[18px] text-gray-800 px-2 py-1 rounded-md text-xs inline-block">
            {article.types?.[0]?.name}
          </span>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-6
             w-full mx-auto
             justify-items-center
             sm:w-auto sm:mx-0
             lg:w-[121%] lg:mr-[-95px]"
        >
          {arrangedImages.length > 0 ? (
            arrangedImages.map((item, i) => (
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
                  <div className="text-black text-[15px] font-bold">
                    {item.title}
                  </div>
                  <div className="text-black text-[13px]">
                    <div>
                      {new Date(
                        article.createDateTime_InUtc
                      ).toLocaleDateString("fa-IR")}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center col-span-3 text-gray-500">
              عکسی برای این مقاله موجود نیست.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
