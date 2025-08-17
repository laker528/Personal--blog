'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import PostCard from '@/components/PostCard';

interface SearchClientProps {
  posts: BlogPost[];
}

export default function SearchClient({ posts }: SearchClientProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];

    const lowercaseQuery = query.toLowerCase();
    return posts.filter((post) => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [posts, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set('q', query.trim());
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const clearSearch = () => {
    setQuery('');
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          搜索文章
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          在 {posts.length} 篇文章中搜索内容
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
            placeholder="搜索文章标题、内容、标签..."
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results */}
      {query.trim() ? (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              搜索结果
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              找到 {filteredPosts.length} 篇相关文章
              {query && (
                <span className="ml-2">
                  关键词: <span className="font-medium">'{query}'</span>
                </span>
              )}
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                没有找到相关文章
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                尝试使用不同的关键词或者浏览所有文章
              </p>
              <button
                onClick={clearSearch}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                清除搜索
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            开始搜索
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            输入关键词来搜索文章
          </p>
        </div>
      )}

      {/* Search Tips */}
      <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          搜索技巧
        </h3>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li>• 搜索会匹配文章标题、内容、分类和标签</li>
          <li>• 搜索不区分大小写</li>
          <li>• 可以搜索部分关键词</li>
          <li>• 尝试使用相关的技术术语或主题词</li>
        </ul>
      </div>
    </div>
  );
}