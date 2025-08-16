import { Metadata } from 'next';
import Link from 'next/link';
import { Tag, Hash } from 'lucide-react';
import { getAllTags } from '@/lib/blog';

export const metadata: Metadata = {
  title: '标签云',
  description: '浏览所有文章标签，快速找到感兴趣的主题。',
};

export default function TagsPage() {
  const tags = getAllTags();

  // 计算标签的字体大小（基于文章数量）
  const getTagSize = (count: number) => {
    const maxCount = Math.max(...tags.map(tag => tag.count));
    const minCount = Math.min(...tags.map(tag => tag.count));
    const ratio = maxCount > minCount ? (count - minCount) / (maxCount - minCount) : 0;
    return Math.max(0.8, 1 + ratio * 1.5); // 字体大小范围：0.8rem - 2.5rem
  };

  // 按文章数量排序
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);
  const popularTags = sortedTags.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          标签云
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          共 {tags.length} 个标签
        </p>
      </div>

      {/* Popular Tags */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          热门标签
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularTags.map((tag, index) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400 mr-3">
                    #{index + 1}
                  </span>
                  <Hash className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    {tag.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                  {tag.count} 篇
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          标签云
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-3 justify-center">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="inline-block px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-800 dark:hover:bg-primary-900 dark:hover:text-primary-200 transition-all duration-200 transform hover:scale-105"
                  style={{ fontSize: `${getTagSize(tag.count)}rem` }}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Tag className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-300">
                暂无标签
              </p>
            </div>
          )}
        </div>
      </div>

      {/* All Tags List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          所有标签
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {tags.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedTags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Hash className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {tag.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">
                    {tag.count} 篇文章
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Tag className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                暂无标签
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                还没有创建任何标签
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tag Stats */}
      <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          标签统计
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {tags.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              总标签数
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {tags.reduce((total, tag) => total + tag.count, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              标签使用次数
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {tags.length > 0 ? Math.round(tags.reduce((total, tag) => total + tag.count, 0) / tags.length) : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              平均使用次数
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {tags.length > 0 ? Math.max(...tags.map(tag => tag.count)) : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              最多使用次数
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
