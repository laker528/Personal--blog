import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog';
import { blogConfig } from '@/config/blog';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, blogConfig.featuredPostsCount);
  const recentPosts = allPosts.slice(blogConfig.featuredPostsCount, blogConfig.featuredPostsCount + 6);
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          欢迎来到
          <span className="text-primary-600 dark:text-primary-400 block">
            {blogConfig.siteName}
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {blogConfig.siteDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/posts"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            浏览文章
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            了解更多
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="mr-3 w-8 h-8 text-primary-600" />
              精选文章
            </h2>
            <Link
              href="/posts"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
            >
              查看全部
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                featured={index === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              最新文章
            </h2>
            <Link
              href="/posts"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
            >
              查看全部
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories and Tags */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            文章分类
          </h3>
          <div className="space-y-3">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
          {categories.length > 5 && (
            <Link
              href="/categories"
              className="block text-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mt-4 font-medium"
            >
              查看全部分类
            </Link>
          )}
        </div>

        {/* Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            热门标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-800 dark:hover:bg-primary-900 dark:hover:text-primary-200 transition-colors duration-200"
              >
                #{tag.name}
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
          {tags.length > 15 && (
            <Link
              href="/tags"
              className="block text-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mt-4 font-medium"
            >
              查看全部标签
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
