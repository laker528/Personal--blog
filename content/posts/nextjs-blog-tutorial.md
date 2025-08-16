---
title: "使用 Next.js 构建现代博客"
excerpt: "详细介绍如何使用 Next.js、TypeScript 和 Tailwind CSS 构建一个功能完整的博客系统。"
date: "2024-01-20"
author: "博主"
tags: ["Next.js", "React", "TypeScript", "教程"]
category: "技术"
coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
published: true
---

# 使用 Next.js 构建现代博客

在这篇文章中，我将分享如何使用 Next.js 构建一个现代化的博客系统。这个博客具有以下特性：

## 主要特性

- ✅ 响应式设计
- ✅ 暗黑模式支持
- ✅ Markdown 文章支持
- ✅ 标签和分类系统
- ✅ 搜索功能
- ✅ SEO 优化
- ✅ 快速加载

## 技术选择

### Next.js 14
Next.js 是一个强大的 React 框架，提供了：
- 服务端渲染 (SSR)
- 静态站点生成 (SSG)
- API 路由
- 图片优化
- 自动代码分割

### TypeScript
TypeScript 为项目提供了类型安全，帮助我们：
- 减少运行时错误
- 提高代码可维护性
- 更好的开发体验

### Tailwind CSS
Tailwind CSS 是一个实用优先的 CSS 框架：
- 快速开发
- 一致的设计系统
- 响应式设计
- 暗黑模式支持

## 项目结构

```
src/
├── app/                 # Next.js App Router
├── components/          # React 组件
├── lib/                # 工具函数
├── types/              # TypeScript 类型定义
└── config/             # 配置文件

content/
└── posts/              # Markdown 文章
```

## 核心功能实现

### 1. Markdown 处理

使用 `gray-matter` 解析 frontmatter，`remark` 将 Markdown 转换为 HTML：

```typescript
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
```

### 2. 静态生成

利用 Next.js 的 `generateStaticParams` 预生成所有文章页面：

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### 3. 搜索功能

实现客户端搜索，支持标题、内容和标签搜索：

```typescript
export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter((post) => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery)
  );
}
```

## 部署

这个博客可以轻松部署到 Vercel：

1. 推送代码到 GitHub
2. 连接 Vercel 账户
3. 自动部署

## 总结

使用 Next.js 构建博客是一个很好的选择，它提供了现代化的开发体验和优秀的性能。通过合理的架构设计，我们可以构建出功能完整、易于维护的博客系统。

下一篇文章我将分享如何添加评论系统和分析功能。
