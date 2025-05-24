'use client';

import React, { useState } from 'react';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function PaginationRounded({ count = 10, onPageChange }) {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > count) return;
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const getVisiblePages = () => {
    if (count <= 2) return [1, 2].slice(0, count);
    if (page === 1) return [1, 2];
    if (page === count) return [count - 1, count];
    return [page - 1, page, page + 1].filter(p => p >= 1 && p <= count);
  };

  const visiblePages = getVisiblePages();

  return (
    <Stack direction="row" spacing={1} justifyContent="center" mt={6} mb={8} alignItems="center">
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
