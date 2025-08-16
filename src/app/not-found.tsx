import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </div>
          <div className="w-32 h-1 bg-primary-600 dark:bg-primary-400 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          页面未找到
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          抱歉，您访问的页面不存在或已被移动。
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <Home className="mr-2 w-5 h-5" />
            返回首页
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Search className="mr-2 w-5 h-5" />
            浏览文章
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            您可能在寻找：
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/posts"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                最新文章
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                查看所有博客文章
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
                按分类浏览内容
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
                通过标签发现内容
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
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          返回上一页
        </button>
      </div>
    </div>
  );
}
