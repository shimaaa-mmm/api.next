'use client';

import Layout from '../layouts/Layout';
import CategoryButtons from '../components/CategoryButtons/CategoryButtons';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import posts from '../data/posts';
import { articles } from '../data/articles';
import PaginationButtons from '../components/PaginationButtons/PaginationButtons';



export default function Home() {
  const router = useRouter();

  const filteredPosts = posts;
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, 3);

  return (
    <Layout>
      <div className="text-center max-w-[75rem] mx-auto mt-8 px-4">
        <h2 className="text-xl font-bold mb-4 leading-7 text-black">
          <Link href="/"> آکادمی حقوق </Link>
        </h2>
        <CategoryButtons />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 gap-8 justify-center">
          {displayedPosts.map(({ id, image, title, date }) => (
            <div
              key={id}
              onClick={() => router.push(`/articles/${id}`)}
              className="relative w-full max-w-[366px] h-[332px] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
              />
              <Link href={`/articles/${id}`}>
                <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm py-3 px-2">
                  <div className="text-black text-[15px] font-bold">{title}</div>
                  <div>{date}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {!showAll && filteredPosts.length > 3 && (
          <div className="flex justify-center mt-10 mb-12">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 mt-6 bg-blue-950 text-white rounded hover:bg-blue-400 transition"
            >
              مشاهده بیشتر
            </button>
          </div>
        )}
        {showAll && (
          <PaginationButtons
            pages={[1, 2]}
            onPageClick={(page) => console.log('Page clicked:', page)}
          />
        )}
      </div>
    </Layout>
  );
}



