'use client';

import React, { useState, useEffect } from 'react';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Layout from '../layouts/Layout';
import CategoryButtons from '../components/CategoryButtons/CategoryButtons';
import Link from 'next/link';
import ArticleImageClient from '../utils/ArticleImageClient';
import LoadingButton from '@mui/lab/LoadingButton';

async function getArticlesWithPagination(pageNumber = 1, pageSize = 12) {
  try {
    const res = await fetch(`https://api.dev.adlara.ir/Landing/Articles?PageNumber=${pageNumber}&PageSize=${pageSize}`, { cache: 'no-store' });
    const json = await res.json();
    return {
      articles: json.data?.articles || [],
      totalPages: json.data?.totalPages || 1,
    };
  } catch {
    return { articles: [], totalPages: 1 };
  }
}

function PaginationRounded({ count = 1, onPageChange }) {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > count) return;
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const visiblePages = React.useMemo(() => {
    if (count <= 2) return Array.from({ length: count }, (_, i) => i + 1);
    if (page === 1) return [1, 2];
    if (page === count) return [count - 1, count];
    return [page - 1, page, page + 1].filter(p => p >= 1 && p <= count);
  }, [count, page]);

  const iconButtonStyle = (disabled) => ({
    color: disabled ? 'grey.500' : 'primary.main',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'color 0.3s',
  });

  const paginationItemStyle = (selected) => ({
    cursor: 'pointer',
    fontWeight: selected ? 'bold' : 'normal',
    backgroundColor: selected ? 'primary.main' : 'transparent',
    color: selected ? 'white' : 'inherit',
    '&:hover': { backgroundColor: selected ? 'primary.dark' : 'action.hover' },
  });

  return (
    <Stack direction="row" spacing={1} justifyContent="center" mt={6} mb={8} alignItems="center">
      <IconButton disabled={page === 1} onClick={() => handlePageChange(page - 1)} aria-label="قبلی" size="large" sx={iconButtonStyle(page === 1)}>
        <ChevronLeftIcon />
      </IconButton>

      {visiblePages.map(p => (
        <PaginationItem key={p} page={p} shape="rounded" selected={p === page} onClick={() => handlePageChange(p)} sx={paginationItemStyle(p === page)} />
      ))}

      <IconButton disabled={page === count} onClick={() => handlePageChange(page + 1)} aria-label="بعدی" size="large" sx={iconButtonStyle(page === count)}>
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );
}

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (!showAll) {
        const { articles } = await getArticlesWithPagination(1, 3);
        setArticles(articles);
        setLoading(false);
        setButtonLoading(false);
        return;
      }

      const { articles, totalPages } = await getArticlesWithPagination(currentPage, 12);
      setArticles(articles);
      setTotalPages(totalPages > 0 ? totalPages : 1);
      setLoading(false);
      setButtonLoading(false);
    };

    fetchData().catch(() => {
      setLoading(false);
      setButtonLoading(false);
    });
  }, [currentPage, showAll]);

  const handlePageChange = (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);
  };

  const handleShowMore = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setShowAll(true);
      setCurrentPage(1);
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="text-center max-w-[75rem] mx-auto mt-8 px-4">
        <h2 className="text-xl font-bold mb-4 leading-7 text-black">
          <Link href="/">آکادمی حقوق</Link>
        </h2>

        <CategoryButtons />

        <div className="mt-16 mb-6 min-h-[332px] flex justify-center items-center">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {articles.map(({ id, thumbnail, title, createDateTime_InUtc }) => (
                <div
                  key={id}
                  className="relative w-full max-w-[366px] h-[332px] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                >
                  <Link href={`/articles/${id}`}>
                    <ArticleImageClient
                      src={thumbnail}
                      alt={title}
                      className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
                    />
                    <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm py-3 px-2">
                      <div className="text-black text-[15px] font-bold">{title}</div>
                      <div>{new Date(createDateTime_InUtc).toLocaleDateString('fa-IR')}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {!showAll && (
          <LoadingButton
            onClick={handleShowMore}
            loading={buttonLoading}
            loadingIndicator={<span style={{ whiteSpace: 'nowrap', color: 'white' }}>در حال بارگذاری...</span>}
            variant="outlined"
            disabled={buttonLoading}
            className="rounded-lg"
            sx={{
              backgroundColor: '#1B3B71',
              color: '#fff',
              fontSize: '14px',
              padding: '7px 55px',
              mt: 3,
              mb: 5,
              '&.MuiLoadingButton-root': { backgroundColor: '#1B3B71' },
              '&:hover': { backgroundColor: '#19949a' },
            }}
          >
            نمایش بیشتر
          </LoadingButton>
        )}

        {showAll && <PaginationRounded count={totalPages} onPageChange={handlePageChange} />}
      </div>
    </Layout>
  );
}
