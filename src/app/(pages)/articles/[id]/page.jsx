import Layout from "../../../../layouts/Layout";
import { getArticeById } from "../../../../utils/fetchArticles";
import ArticleImageClient from "../../../../utils/ArticleImageClient";
import Link from "next/link";

async function fetchImages() {
  const res = await fetch("https://api.dev.adlara.ir/Landing/Articles", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch images");
  const data = await res.json();
  return data.data.articles;
}

export default async function ArticleDetail({ params }) {
  const { id } = params;
  const articleResult = await getArticeById(Number(id));
  const article = articleResult?.data;

  if (!article) {
    return (
      <Layout>
        <div className="text-center mt-10 text-red-500" dir="rtl">
          مقاله پیدا نشد.
        </div>
      </Layout>
    );
  }

  let images = [];
  try {
    images = await fetchImages();
  } catch (error) {
    console.error("Error fetching images:", error);
  }

  let arrangedImages = [];

  if (images.length > 0) {
    const totalImages = images.length;
    const startIndex = article.id % totalImages;

    for (let i = 0; i < 3; i++) {
      arrangedImages.push(images[(startIndex + i * 2) % totalImages]);
    }
  } else {
    arrangedImages = [];
  }

  return (
    <Layout>
      <div className="max-w-[60rem] mx-auto p-4 mt-[44px]" dir="rtl">
        <h1 className="text-[rgb(26,59,112)] font-bold text-[18px] leading-[1.5rem] mb-2 text-right">
          {article.title}
        </h1>

        <p className="mt-6 text-gray-700 leading-[2.1] text-right">
          {article.summary}
        </p>

        <div className="flex justify-start gap-3 text-sm text-gray-500 mb-1 border-b border-gray-300 pb-2">
          <div>
            {new Date(article.createDateTime_InUtc).toLocaleDateString("fa-IR")}
          </div>
        </div>

        <div className="flex gap-6 py-2">
          <div
            dangerouslySetInnerHTML={{ __html: article.description }}
            className="w-full m-2.5 p-2.5 bg-[#d9dce1] rounded-lg text-sm font-normal text-right"
          />
        </div>

        <div className="tags mt-6 border-t border-t-gray-200 pt-4 px-4 flex flex-wrap gap-6">
          <span className="inline-block p-[12px] my-[9px] mx-[3px] bg-[#d9dce1] rounded-[8px] text-[14px]">
            {article.types?.[0]?.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-[121%] mr-[-95px] lg:grid-cols-3 mt-16 gap-8 justify-center mb-6">
          {arrangedImages.length > 0 ? (
            arrangedImages.map((item, i) => (
              <Link href={`/articles/${item.id}`} key={item.id}>
                <div className="relative w-full max-w-[366px] h-[332px] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                  <ArticleImageClient
                    src={item.thumbnail}
                    alt={item.title || `تصویر ${i + 1}`}
                    className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:opacity-90"
                  />
                  <div className="absolute bottom-0 w-full bg-[#9ca3af61] text-center text-sm py-3 px-2">
                    <div className="text-black text-[15px] font-bold">
                      {item.title}
                    </div>
                    <div className="text-black text-[13px]">
                      <div>{new Date(article.createDateTime_InUtc).toLocaleDateString('fa-IR')}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center col-span-3 text-gray-500">
              عکسی برای این مقاله موجود نیست.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
