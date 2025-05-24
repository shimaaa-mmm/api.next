'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircularProgress } from '@mui/material';

export default function CategoryButtons({ counts = {} }) {
  const pathname = usePathname();
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (category) => {
    setActive(category);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const isActive = (categoryPath) =>
    active === categoryPath || pathname === categoryPath;

  const buttonClass = (categoryPath) => {
    const base =
      'w-[249px] h-[57px] flex items-center justify-center gap-2 px-4 py-2 rounded-[11px] text-[16px] transition-colors';
    const bg = loading && active === categoryPath
      ? 'bg-[#0A3E61] text-white' 
      : isActive(categoryPath)
      ? 'bg-[#0F5986] text-white'
      : 'bg-[#E1F0F8] text-[rgb(27,61,115)]';
    return `${base} ${bg}`;
  };

  return (
    <div className="flex justify-center gap-4 mb-8 mt-[55px]" dir="rtl">
      <Link
        href="/articles"
        onClick={() => handleClick('/articles')}
        className={buttonClass('/articles')}
      >
        {loading && active === '/articles' && (
          <CircularProgress size={16} color="inherit" />
        )}
        مقاله ({counts.article ?? 12} مورد)
      </Link>

      <Link
        href="/videos"
        onClick={() => handleClick('/videos')}
        className={buttonClass('/videos')}
      >
        {loading && active === '/videos' && (
          <CircularProgress size={16} color="inherit" />
        )}
        ویدیو ({counts.video ?? 1} مورد)
      </Link>

      <Link
        href="/podcasts"
        onClick={() => handleClick('/podcasts')}
        className={buttonClass('/podcasts')}
      >
        {loading && active === '/podcasts' && (
          <CircularProgress size={16} color="inherit" />
        )}
        پادکست ({counts.podcast ?? 0} مورد)
      </Link>
    </div>
  );
}
