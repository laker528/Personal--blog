import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { blogConfig } from '@/config/blog';

export default function HomePage() {
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

      {/* Welcome Content */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            技术分享
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            分享前端开发、后端技术、工具使用等技术文章
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            生活感悟
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            记录日常思考、读书笔记、旅行见闻等生活感悟
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            项目展示
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            展示个人项目和开源贡献，分享开发经验
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          快速导航
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/posts"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              所有文章
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              浏览全部内容
            </p>
          </Link>
          
          <Link
            href="/categories"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              文章分类
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              按分类浏览
            </p>
          </Link>
          
          <Link
            href="/tags"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              标签云
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              通过标签发现
            </p>
          </Link>
          
          <Link
            href="/about"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              关于我
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              了解博客作者
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
