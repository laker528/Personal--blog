import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllPosts } from '@/lib/blog';
import SearchClient from '@/components/SearchClient';
import Loading from '@/components/Loading';

export const metadata: Metadata = {
  title: '搜索文章',
  description: '搜索博客文章内容，支持标题、内容、标签搜索。',
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <Suspense fallback={<Loading text="加载搜索页面..." />}>
      <SearchClient posts={posts} />
    </Suspense>
  );
}