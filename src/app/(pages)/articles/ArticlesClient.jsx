'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryButtons from '../../../components/CategoryButtons/CategoryButtons';
import Link from 'next/link';
import ArticleImageClient from '../../../utils/ArticleImageClient';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PaginationItem from '@mui/material/PaginationItem';

function PaginationRounded({ count = 1, page, onPageChange }) {
  const handleChange = (newPage) => {
    if (newPage < 1 || newPage > count) return;
    onPageChange?.(newPage);
  };

  const visiblePages =
    count <= 2
      ? Array.from({ length: count }, (_, i) => i + 1)
      : page === 1
      ? [1, 2]
      : page === count
      ? [count - 1, count]
      : [page - 1, page, page + 1].filter((p) => p >= 1 && p <= count);

  return (
    <Stack direction="row" spacing={1} justifyContent="center" mt={6} mb={8} alignItems="center">
      <IconButton
        disabled={page === 1}
        onClick={() => handleChange(page - 1)}
        aria-label="قبلی"
        size="large"
        sx={{
          color: page === 1 ? 'grey.500' : 'primary.main',
          cursor: page === 1 ? 'not-allowed' : 'pointer',
          transition: 'color 0.3s',
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {visiblePages.map((p) => (
        <PaginationItem
          key={p}
          page={p}
          shape="rounded"
          selected={p === page}
          onClick={() => handleChange(p)}
          sx={{
            cursor: 'pointer',
            fontWeight: p === page ? 'bold' : 'normal',
            backgroundColor: p === page ? 'primary.main' : 'transparent',
            color: p === page ? 'white' : 'inherit',
            '&:hover': {
              backgroundColor: p === page ? 'primary.dark' : 'action.hover',
            },
          }}
        />
      ))}

      <IconButton
        disabled={page === count}
        onClick={() => handleChange(page + 1)}
        aria-label="بعدی"
        size="large"
        sx={{
          color: page === count ? 'grey.500' : 'primary.main',
          cursor: page === count ? 'not-allowed' : 'pointer',
          transition: 'color 0.3s',
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );
}

export default function ArticlesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://api.dev.adlara.ir/Landing/Articles?PageNumber=1&PageSize=13', {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('خطا در دریافت مقالات');
        const data = await res.json();
        setArticles(data?.data?.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalPages = articles.length > 9 ? 2 : 1;

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageLoading(false);
      router.push(`?page=${page}`, { shallow: true });
    }, 2000);
  };

  const start = currentPage === 1 ? 0 : 9;
  const end = currentPage === 1 ? 9 : 13;
  const displayedArticles = articles.slice(start, end);

  const padSize = currentPage === 1 ? 9 : 4;
  const paddedArticles = [...displayedArticles];
  while (paddedArticles.length < padSize) paddedArticles.push(null);

  return (
    <div className="text-center max-w-[75rem] mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-4 text-center">آکادمی حقوق</h2>
      <CategoryButtons />

      <div className="mt-16 mb-6 min-h-[332px] flex justify-center items-center">
        {loading || pageLoading ? (
          <CircularProgress />
        ) : error ? (
          <div className="text-red-500 text-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center w-full">
            {paddedArticles.map((article, i) =>
              article ? (
                <div
                  key={article.id}
                  className="relative w-full max-w-[366px] h-[332px] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer mx-auto"
                >
                  <Link href={`/articles/${article.id}`} className="block w-full h-full">
                    <ArticleImageClient
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
                    />
                    <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm py-3 px-2">
                      <div className="text-black text-[15px] font-bold">{article.title}</div>
                      <div>{new Date(article.createDateTime_InUtc).toLocaleDateString('fa-IR')}</div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div key={`empty-${i}`} className="w-full max-w-[366px] h-[332px] rounded-xl bg-transparent mx-auto"></div>
              )
            )}
          </div>
        )}
      </div>

      <PaginationRounded count={totalPages} page={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}
