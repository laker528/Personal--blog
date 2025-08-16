'use client';

import { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, Upload } from 'lucide-react';
import { BlogPost, BlogMetadata } from '@/types/blog';

interface PostEditorProps {
  post?: BlogPost;
  onSave: (post: Partial<BlogPost>) => void;
  onCancel: () => void;
}

export default function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [coverImage, setCoverImage] = useState(post?.coverImage || '');
  const [published, setPublished] = useState(post?.published ?? false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('标题和内容不能为空');
      return;
    }

    setIsLoading(true);
    try {
      const postData: Partial<BlogPost> = {
        title: title.trim(),
        excerpt: excerpt.trim() || content.substring(0, 150) + '...',
        content: content.trim(),
        category: category.trim() || '未分类',
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        coverImage: coverImage.trim() || undefined,
        published,
        date: post?.date || new Date().toISOString().split('T')[0],
        author: post?.author || '博主',
        slug: post?.slug || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
        readingTime: Math.ceil(content.split(/\s+/).length / 200),
      };

      await onSave(postData);
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('保存失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['技术', '生活', '教程', '思考', '分享'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {post ? '编辑文章' : '新建文章'}
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {showPreview ? <EyeOff className="mr-2 w-4 h-4" /> : <Eye className="mr-2 w-4 h-4" />}
            {showPreview ? '隐藏预览' : '显示预览'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Save className="mr-2 w-4 h-4" />
            {isLoading ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标题 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="输入文章标题..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              摘要
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="输入文章摘要..."
            />
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                分类
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">选择分类</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                标签
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="标签1, 标签2, 标签3"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              封面图片
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Published */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              立即发布
            </label>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              内容 * (支持 Markdown)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
              placeholder="在这里输入文章内容，支持 Markdown 语法..."
            />
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              预览
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h1>{title || '文章标题'}</h1>
              {excerpt && <p className="text-gray-600 dark:text-gray-400 italic">{excerpt}</p>}
              <div className="whitespace-pre-wrap">{content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
