'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ArticleImageClient from '../../utils/ArticleImageClient';

import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function CustomPagination({ count, page, onPageChange }) {
  const getVisiblePages = () => {
    if (page >= count) {
      return [count - 1, count];
    }
    return [page, page + 1];
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > count) return;
    onPageChange(newPage);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      mt={6}
      mb={8}
      alignItems="center"
      className="w-full"
    >
      <IconButton
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        aria-label="قبلی"
        size="large"
      >
        <ChevronLeftIcon />
      </IconButton>

      {visiblePages.map((p) => (
        <PaginationItem
          key={p}
          page={p}
          shape="rounded"
          selected={p === page}
          onClick={() => handlePageChange(p)}
          sx={{ cursor: 'pointer' }}
        />
      ))}

      <IconButton
        disabled={page === count}
        onClick={() => handlePageChange(page + 1)}
        aria-label="بعدی"
        size="large"
      >
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );
}

export default function PaginatedArticles({ articles }) {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-8 justify-center mb-6">
        {currentArticles.map(({ id, thumbnail, title, createDateTime_InUtc }) => (
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

      <CustomPagination count={totalPages} page={currentPage} onPageChange={handlePageChange} />
    </>
  );
}
