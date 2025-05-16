"use client";

import { useState } from "react";
import Layout from "../../../../layouts/Layout";
import { videos } from "../../../../data/videos";

export default function VideoDetail({ params }) {
  const { id } = params;

  const [filter, setFilter] = useState("video");

  const posts = videos;

  const mainVideo = videos.find((v) => String(v.id) === String(id)) || videos[0];

  const filteredVideos = posts.filter((p) => p.types === filter);

  return (
    <Layout>
      <div className="p-8 max-w-3xl mx-auto text-right mt-5" dir="rtl">

        <video controls className="mx-auto rounded shadow max-w-[700px] max-h-[500px]" width="700">
          <source src={mainVideo.url || "/videos/sample.mp4"} type="video/mp4" />
          مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
        </video>

        <div className="text-right space-y-4 mr-[-160px] mt-[75px]">
          <h3 className="text-xl font-bold">{mainVideo.titles} </h3>
          <p className="text-gray-700">{mainVideo.summary}</p>

          <div className="flex justify-start gap-[30px] items-center text-gray-600">
            <div>
              <span className="font-semibold">نویسنده: </span>
              <span>{mainVideo.author}</span>
            </div>
            <div>
              <span className="font-semibold">تاریخ: </span>
              <span>{mainVideo.date}</span>
            </div>
          </div>
        </div>

        <hr className="my-12 border-gray-300 w-[156%] -mr-[187px]" />

        <h3 className="mb-6 mr-[-160px] bg-[#949494] w-[8%] px-[10px] pt-[11px] pb-[10px] rounded-[9px] text-[15px] font-medium">
          {mainVideo.category}
        </h3>
        <div className=" p-4 "
         style={{ maxWidth: "193%", width: "160%", marginRight: "-211px" }}>

          <div
            className="flex justify-end gap-8 mb-3 flex-row-reverse"
          >
            {mainVideo.images.slice(0, 3).map((img, index) => (
              <div
                key={index}
                className="relative w-full max-w-[366px] h-[332px] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={img}
                  alt={`تصویر مرتبط ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
                />
                <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm py-3 px-2">
                  <div className="text-black text-[15px] font-bold">{mainVideo.titles}</div>
                  <div className="text-sm mt-1">{mainVideo.date}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </Layout>
  );
}
