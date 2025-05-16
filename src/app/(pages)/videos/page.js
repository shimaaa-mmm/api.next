import Layout from '../../../layouts/Layout';
import CategoryButtons from '../../../components/CategoryButtons/CategoryButtons';
import Link from 'next/link';
import PaginationButtons from '../../../components/PaginationButtons/PaginationButtons'; 
import { videos } from '../../../data/videos';

export default function VideosPage() {
  return (
    <Layout>
      <div className="container mx-auto text-center mt-8 px-4 pr-4">
        <h2 className="text-3xl font-bold mb-4 text-center">آکادمی حقوق</h2>
        <CategoryButtons />

        <div className="flex flex-wrap gap-8 mt-16 flex-row-reverse justify-start mb-24 mr-[70px]">

          {videos.map((video) => (
            <div
              key={video.id}
              className="video-element cursor-default w-[306.933px] relative block"
            >
              <img
                src={video.url}
                alt={video.titles}
                className="w-full h-[282px] object-cover rounded-3xl"
              />
              <Link href={`/videos/${video.id}`}>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center p-2 rounded-b-3xl cursor-pointer">
                  <div className="text-base font-semibold">{video.titles}</div>
                  <div className="text-sm mt-1">{video.date}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <PaginationButtons pages={[1]} />

      </div>
    </Layout>
  );
}
