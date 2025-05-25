import Layout from "../../../../layouts/Layout";
import { getArticeById } from "../../../../utils/fetchArticles";
import SuggestedImages from "../../../../components/SuggestedImages/SuggestedImages";

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
    const allImages = await fetchImages();
    const totalImages = allImages.length;
    const startIndex = article.id % totalImages;

    for (let i = 0; i < 3; i++) {
      images.push(allImages[(startIndex + i * 2) % totalImages]);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }

  return (
    <Layout>
      <div className="max-w-[60rem] mx-auto p-4 mt-[44px]" dir="rtl">
        {/* Article Title */}
        <h1 className="text-[rgb(26,59,112)] font-bold text-[18px] leading-[1.5rem] mb-2 text-right">
          {article.title}
        </h1>

        {/* Article Summary */}
        <p className="mt-6 text-gray-700 leading-[2.1] text-right">
          {article.summary}
        </p>

        {/* Article Date */}
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

        <div className="mt-16">
          <SuggestedImages images={images} />
        </div>
      </div>
    </Layout>
  );
}
