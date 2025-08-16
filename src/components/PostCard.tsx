import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={`group ${featured ? 'col-span-2' : ''}`}>
      <Link href={`/posts/${post.slug}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Cover Image */}
          {post.coverImage && (
            <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          )}

          <div className="p-6">
            {/* Category */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h2 className={`font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-3 ${
              featured ? 'text-2xl' : 'text-xl'
            }`}>
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} 分钟阅读</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center space-x-2 mt-4">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
