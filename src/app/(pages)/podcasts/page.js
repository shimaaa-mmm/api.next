import CategoryButtons from '../../../components/CategoryButtons/CategoryButtons';
import Layout from '../../../layouts/Layout';
import Link from 'next/link';

export default function PodcastsPage() {
  return (
    <Layout>
      <div className="text-center mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center">آکادمی حقوق</h2>
        <CategoryButtons/>
        <p className="text-gray-700">محتوای پادکست در آینده اضافه خواهد شد.</p>
      </div>
    </Layout>
  );
}