import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Hash, FileText } from 'lucide-react';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import PostCard from '@/components/PostCard';

interface TagPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tags = getAllTags();
  const tag = tags.find(t => t.slug === params.slug);

  if (!tag) {
    return {
      title: '标签未找到',
    };
  }

  return {
    title: `#${tag.name} - 标签`,
    description: `浏览标签 ${tag.name} 下的所有文章，共 ${tag.count} 篇。`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tags = getAllTags();
  const tag = tags.find(t => t.slug === params.slug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to tags */}
      <Link
        href="/tags"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        返回标签列表
      </Link>

      {/* Tag Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-lg">
            <Hash className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="ml-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              #{tag.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              与 {tag.name} 相关的文章
            </p>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <FileText className="w-5 h-5 mr-2" />
          <span>{tag.count} 篇文章</span>
        </div>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            相关文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <FileText className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            暂无文章
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            这个标签下还没有文章
          </p>
        </div>
      )}

      {/* Related Tags */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          相关标签
        </h3>
        <div className="flex flex-wrap gap-3">
          {tags
            .filter(t => t.slug !== params.slug)
            .slice(0, 10)
            .map((t) => (
              <Link
                key={t.slug}
                href={`/tags/${t.slug}`}
                className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-800 dark:hover:bg-primary-900 dark:hover:text-primary-200 transition-colors duration-200"
              >
                #{t.name}
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {t.count}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
