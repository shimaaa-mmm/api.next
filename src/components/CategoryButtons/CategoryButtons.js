'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CategoryButtons({ counts = {} }) {
  const pathname = usePathname();
  const [active, setActive] = useState(null);

  const handleClick = (category) => {
    setActive(category);
  };

  const isActive = (categoryPath) => {
    return (
      active === categoryPath || pathname === categoryPath
    );
  };

  const buttonClass = (categoryPath) =>
    `w-[249px] h-[57px] flex items-center justify-center px-4 py-2 rounded-card transition-colors ${
      isActive(categoryPath) ? 'bg-[#0F5986] text-white' : 'bg-[#E1F0F8] text-black'
    }`;

  return (
  <div className="flex justify-center gap-4 mb-8 mt-[55px]" dir="rtl">
      <Link
        href="/articles"
        onClick={() => handleClick('/articles')}
        className={buttonClass('/articles')}
      >
      مقاله ({counts.article ?? 12} مورد)
      </Link>

      <Link
        href="/videos"
        onClick={() => handleClick('/videos')}
        className={buttonClass('/videos')}
      >
        ویدیو ({counts.video ?? 1}مورد)
      </Link>

      <Link
        href="/podcasts"
        onClick={() => handleClick('/podcasts')}
        className={buttonClass('/podcasts')}
      >
        پادکست ({counts.podcast ?? 0}مورد)
      </Link>
    </div>
  );
}
