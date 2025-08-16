import { Metadata } from 'next';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog';
import PostCard from '@/components/PostCard';
import { Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: '所有文章',
  description: '浏览所有博客文章，包含技术分享、生活感悟等内容。',
};

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          所有文章
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          共 {posts.length} 篇文章
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Categories Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Filter className="mr-2 w-5 h-5" />
                分类筛选
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <a
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                热门标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => (
                  <a
                    key={tag.slug}
                    href={`/tags/${tag.slug}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-800 dark:hover:bg-primary-900 dark:hover:text-primary-200 transition-colors duration-200"
                  >
                    #{tag.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Posts Grid */}
        <main className="lg:col-span-3">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                暂无文章
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
