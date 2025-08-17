import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Folder, FileText } from 'lucide-react';
import { getAllCategories, getPostsByCategory } from '@/lib/blog';
import PostCard from '@/components/PostCard';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = getAllCategories();
  const category = categories.find(cat => cat.slug === params.slug);

  if (!category) {
    return {
      title: '分类未找到',
    };
  }

  return {
    title: `${category.name} - 分类`,
    description: `浏览 ${category.name} 分类下的所有文章，共 ${category.count} 篇。`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categories = getAllCategories();
  const category = categories.find(cat => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to categories */}
      <Link
        href="/categories"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        返回分类列表
      </Link>

      {/* Category Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-lg">
            <Folder className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="ml-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              {category.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <FileText className="w-5 h-5 mr-2" />
          <span>{category.count} 篇文章</span>
        </div>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            文章列表
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
            这个分类下还没有文章
          </p>
        </div>
      )}

      {/* Related Categories */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          其他分类
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories
            .filter(cat => cat.slug !== params.slug)
            .slice(0, 4)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
              >
                <div className="flex items-center mb-2">
                  <Folder className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {cat.name}
                  </h4>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {cat.count} 篇文章
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
