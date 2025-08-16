import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogMetadata, Category, Tag } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): BlogPost[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const metadata = data as BlogMetadata;
      
      return {
        slug,
        title: metadata.title,
        excerpt: metadata.excerpt,
        content,
        date: metadata.date,
        author: metadata.author,
        tags: metadata.tags || [],
        category: metadata.category,
        coverImage: metadata.coverImage,
        readingTime: calculateReadingTime(content),
        published: metadata.published !== false,
      } as BlogPost;
    })
    .filter((post) => post.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return allPostsData;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const metadata = data as BlogMetadata;

    return {
      slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      content,
      date: metadata.date,
      author: metadata.author,
      tags: metadata.tags || [],
      category: metadata.category,
      coverImage: metadata.coverImage,
      readingTime: calculateReadingTime(content),
      published: metadata.published !== false,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getAllCategories(): Category[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: slugify(name),
    description: `${count} 篇文章`,
    count,
  }));
}

export function getAllTags(): Tag[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  return Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    slug: slugify(name),
    count,
  }));
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => slugify(post.category) === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => 
    post.tags.some((postTag) => slugify(postTag) === tag)
  );
}

export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter((post) => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
