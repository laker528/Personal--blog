import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllPosts, getPostBySlug, markdownToHtml } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to posts */}
      <Link
        href="/posts"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        返回文章列表
      </Link>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        {/* Category */}
        <div className="mb-4">
          <Link
            href={`/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200"
          >
            {post.category}
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{post.readingTime} 分钟阅读</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>作者：{post.author}</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-strong:text-gray-900 dark:prose-strong:text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Navigation */}
      <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Previous Post */}
          {prevPost && (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="group p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center text-primary-600 dark:text-primary-400 mb-2">
                <ArrowLeft className="mr-2 w-4 h-4" />
                <span className="text-sm font-medium">上一篇</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                {prevPost.title}
              </h3>
            </Link>
          )}

          {/* Next Post */}
          {nextPost && (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="group p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 md:text-right"
            >
              <div className="flex items-center justify-end text-primary-600 dark:text-primary-400 mb-2">
                <span className="text-sm font-medium">下一篇</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                {nextPost.title}
              </h3>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
