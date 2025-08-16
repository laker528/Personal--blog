import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { blogConfig } from '@/config/blog';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {blogConfig.siteName}
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              {blogConfig.siteDescription}
            </p>
            <div className="flex space-x-4">
              {blogConfig.author.social.github && (
                <a
                  href={blogConfig.author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {blogConfig.author.social.twitter && (
                <a
                  href={blogConfig.author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {blogConfig.author.social.linkedin && (
                <a
                  href={blogConfig.author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {blogConfig.author.social.email && (
                <a
                  href={`mailto:${blogConfig.author.social.email}`}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              快速链接
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/posts"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  所有文章
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  文章分类
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  标签云
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  关于我
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              热门分类
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/技术"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  技术文章
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/生活"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  生活感悟
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/教程"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  教程分享
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {currentYear} {blogConfig.author.name}. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}
