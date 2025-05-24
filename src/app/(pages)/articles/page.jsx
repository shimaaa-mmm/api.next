import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Layout from '../../../layouts/Layout';


const ArticlesClient = dynamic(() => import('./ArticlesClient'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function ArticlesPage() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticlesClient />
      </Suspense>
    </Layout>
  );
}


