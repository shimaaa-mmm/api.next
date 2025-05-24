'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../../../layouts/Layout';
import CategoryButtons from '../../../components/CategoryButtons/CategoryButtons';
import Link from 'next/link';
import PaginationButtons from '../../../components/PaginationButtons/PaginationButtons';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ArticleImageClient from '../../../utils/ArticleImageClient';

async function fetchVideos() {
  const res = await fetch('https://api.dev.adlara.ir/Landing/Articles', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('خطا در دریافت ویدیوها');
  }

  const result = await res.json();
  return result?.data?.articles || [];
}

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos()
      .then(data => {
        setVideos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!videos.length) {
    return (
      <Layout>
        <div className="container mx-auto text-right mt-8 px-4 pl-4">
          <h2 className="text-3xl font-bold mb-4">آکادمی حقوق</h2>
          <CategoryButtons />
          <p>ویدیویی یافت نشد.</p>
        </div>
      </Layout>
    );
  }

  const video = videos[0];

  return (
    <Layout>
      <div className="container mx-auto text-center mt-8 px-4 pl-4">
        <h2 className="text-3xl font-bold mb-4">آکادمی حقوق</h2>
        <CategoryButtons />

        <div className="relative w-full max-w-[366px] h-[332px] mr-[52px] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer ml-auto">
          <Link href={`/videos/${video.id}`}>
            <ArticleImageClient
              src={video.thumbnail || ''}
              alt={video.title || "تصویر ویدیو"}
              className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
            />
            <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm py-3 px-2">
              <div className="text-black text-[15px] font-bold">{video.title}</div>
              <div>{new Date(video.createDateTime_InUtc).toLocaleDateString('fa-IR')}</div>
            </div>
          </Link>
        </div>

        <PaginationButtons pages={[1]} />
      </div>
    </Layout>
  );
}
