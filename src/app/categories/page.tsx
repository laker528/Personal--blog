import { Metadata } from 'next';
import Link from 'next/link';
import { Folder, FileText } from 'lucide-react';
import { getAllCategories } from '@/lib/blog';

export const metadata: Metadata = {
  title: '文章分类',
  description: '浏览所有文章分类，快速找到感兴趣的内容。',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          文章分类
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          共 {categories.length} 个分类
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-200">
                    <Folder className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {category.name}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FileText className="w-4 h-4 mr-1" />
                  <span>{category.count} 篇文章</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Folder className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            暂无分类
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            还没有创建任何分类
          </p>
        </div>
      )}

      {/* Category Stats */}
      <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          分类统计
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              总分类数
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {categories.reduce((total, cat) => total + cat.count, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              总文章数
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {categories.length > 0 ? Math.round(categories.reduce((total, cat) => total + cat.count, 0) / categories.length) : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              平均文章数
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {categories.length > 0 ? Math.max(...categories.map(cat => cat.count)) : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              最多文章数
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
