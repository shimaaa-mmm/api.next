import Layout from '../../../layouts/Layout';
import CategoryButtons from '../../../components/CategoryButtons/CategoryButtons';
import PaginationButtons from '../../../components/PaginationButtons/PaginationButtons'; 

import Link from 'next/link';
import { articles } from '../../../data/articles';

export default function ArticlesPage() {
  return (
    <Layout>
      <div className="text-center max-w-[75rem] mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">آکادمی حقوق</h2>

        <CategoryButtons />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-[60px] justify-items-center">
          {articles.slice(0, 12).map(({ ids, images, titles, dates, legalTitles }) => (
            <div
              key={ids}
              className="rounded-xl overflow-hidden relative w-full max-w-[366px] h-[332px] shadow hover:shadow-lg transition"
            >
              <img
                src={images}
                alt={titles}
                className="object-cover w-full h-full rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
              />
              <Link href={`/articles/${ids}`}>
                <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm pt-2.5 pb-4 cursor-pointer">
                  <div className="text-black text-[15px] font-bold">{titles}</div>
                  <div>{dates}{legalTitles ? ` | ${legalTitles}` : ''}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-[45px] mb-8 gap-2">
         <PaginationButtons pages={[1, 2]} />

        </div>
      </div>
    </Layout>
  );
}
