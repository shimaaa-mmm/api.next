import Layout from '../../../../layouts/Layout';
import { articles } from '../../../../data/articles';

export default function ArticleDetail({ params }) {
  const { id } = params;
  const article = articles.find((item) => item.ids === parseInt(id));

  if (!article) {
    return (
      <Layout>
        <div className="text-center mt-10 text-red-500" dir="rtl">
          مقاله پیدا نشد.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[60rem] mx-auto p-4 mt-[44px]" dir="rtl">
        <h1 className="text-[rgb(26,59,112)] font-bold text-[18px] leading-[1.5rem] mb-2 text-right">
          {article.titles}
        </h1>

        <p className="mt-6 text-gray-700 leading-[2.1] text-right">
          {article.contents}
        </p>

        <div className="flex justify-start gap-3 text-sm text-gray-500 mb-1 border-b border-gray-300 pb-2">
          <span>نویسنده: {article.authors}</span>
          <span>تاریخ: {article.dates}</span>
        </div>

        <p className="text-base leading-[2.1] text-black mb-4 text-right border-b border-gray-300 pb-2">
          {article.descriptions}
        </p>

        <h2 className="inline-block m-2.5 p-2.5 bg-[#d9dce1] rounded-lg text-sm font-normal text-right">
          {article.legalTitles}
        </h2>

        <div className="mt-10 p-4 max-w-[1150px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative w-full max-w-[366px] h-[332px] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={article.images}
                  alt={`تصویر ${i}`}
                  className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
                />
                <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm py-3 px-2">
                  <div className="text-black text-[15px] font-bold">{article.titles}</div>
                  <div className="text-black text-[13px]">{article.dates}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
