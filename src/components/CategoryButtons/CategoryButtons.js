'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircularProgress } from '@mui/material';

import './CategoryButtons.css';

export default function CategoryButtons({ counts = {} }) {
  const pathname = usePathname();
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (category) => {
    setActive(category);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const isActive = (categoryPath) =>
    active === categoryPath || pathname === categoryPath;

  if (!mounted) return null;

  return (
    <div className="category-buttons-container">
      <Link
        href="/articles"
        onClick={() => handleClick('/articles')}
        className={`category-button glass-hover ${
          loading && active === '/articles'
            ? 'loading'
            : isActive('/articles')
            ? 'active'
            : ''
        } half-width`}
      >
        {loading && active === '/articles' && (
          <CircularProgress size={16} color="inherit" />
        )}
        مقاله ({counts.article ?? 12} مورد)
      </Link>

      <Link
        href="/videos"
        onClick={() => handleClick('/videos')}
        className={`category-button glass-hover ${
          loading && active === '/videos'
            ? 'loading'
            : isActive('/videos')
            ? 'active'
            : ''
        } half-width`}
      >
        {loading && active === '/videos' && (
          <CircularProgress size={16} color="inherit" />
        )}
        ویدیو ({counts.video ?? 1} مورد)
      </Link>

      <Link
        href="/podcasts"
        onClick={() => handleClick('/podcasts')}
        className={`category-button glass-hover ${
          loading && active === '/podcasts'
            ? 'loading'
            : isActive('/podcasts')
            ? 'active'
            : ''
        }`}
      >
        {loading && active === '/podcasts' && (
          <CircularProgress size={16} color="inherit" />
        )}
        پادکست ({counts.podcast ?? 0} مورد)
      </Link>
    </div>
  );
}
