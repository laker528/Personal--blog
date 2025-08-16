# Spider Blog

一个现代化的个人博客系统，基于 Next.js 14、TypeScript 和 Tailwind CSS 构建。

## ✨ 特性

- 🚀 **现代化技术栈**: Next.js 14 + TypeScript + Tailwind CSS
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🌙 **暗黑模式**: 支持明暗主题切换
- 📝 **Markdown 支持**: 使用 Markdown 编写文章
- 🔍 **全文搜索**: 支持文章标题、内容、标签搜索
- 🏷️ **分类标签**: 完整的分类和标签系统
- ⚡ **性能优化**: 静态生成 + 图片优化
- 🎨 **美观界面**: 现代化的 UI 设计
- 📊 **SEO 友好**: 完整的 SEO 优化
- 🛠️ **管理后台**: 简单易用的文章管理界面

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/spider-blog.git
   cd spider-blog
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env.local
   ```
   编辑 `.env.local` 文件，配置你的网站信息。

4. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

5. **访问网站**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
spider-blog/
├── src/
│   ├── app/                 # Next.js App Router 页面
│   │   ├── page.tsx        # 首页
│   │   ├── posts/          # 文章相关页面
│   │   ├── categories/     # 分类页面
│   │   ├── tags/           # 标签页面
│   │   ├── search/         # 搜索页面
│   │   ├── about/          # 关于页面
│   │   └── admin/          # 管理后台
│   ├── components/         # React 组件
│   ├── lib/               # 工具函数
│   ├── types/             # TypeScript 类型定义
│   └── config/            # 配置文件
├── content/
│   └── posts/             # Markdown 文章文件
├── public/                # 静态资源
└── ...配置文件
```

## ✍️ 写作指南

### 创建新文章

1. 在 `content/posts/` 目录下创建新的 `.md` 文件
2. 文件名将作为文章的 URL slug
3. 在文件开头添加 frontmatter：

```markdown
---
title: "文章标题"
excerpt: "文章摘要"
date: "2024-01-15"
author: "作者名"
tags: ["标签1", "标签2"]
category: "分类名"
coverImage: "https://example.com/image.jpg"
published: true
---

# 文章内容

这里是文章的正文内容，支持完整的 Markdown 语法。
```

### Frontmatter 字段说明

- `title`: 文章标题（必需）
- `excerpt`: 文章摘要（可选，如果不提供会自动截取内容前150字）
- `date`: 发布日期（必需，格式：YYYY-MM-DD）
- `author`: 作者名（可选，默认使用配置中的作者名）
- `tags`: 标签数组（可选）
- `category`: 分类名（可选，默认为"未分类"）
- `coverImage`: 封面图片URL（可选）
- `published`: 是否发布（可选，默认为 true）

## 🎨 自定义配置

### 网站配置

编辑 `src/config/blog.ts` 文件来自定义你的博客信息：

```typescript
export const blogConfig: BlogConfig = {
  siteName: '你的博客名称',
  siteDescription: '博客描述',
  author: {
    name: '你的名字',
    bio: '个人简介',
    avatar: '/images/avatar.jpg',
    social: {
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
      // ...
    },
  },
  // ...
};
```

### 主题定制

博客使用 Tailwind CSS，你可以通过修改 `tailwind.config.ts` 来自定义主题：

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      },
    },
  },
},
```

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 上导入项目
3. 配置环境变量
4. 部署完成！

### 其他平台

博客也可以部署到其他支持 Next.js 的平台：

- **Netlify**: 支持静态导出
- **Railway**: 支持全栈部署
- **DigitalOcean App Platform**: 容器化部署

## 🛠️ 开发

### 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行 ESLint
npm run type-check   # TypeScript 类型检查
```

### 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **Markdown**: gray-matter + remark
- **部署**: Vercel

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题，请通过以下方式联系：

- GitHub Issues: [项目 Issues](https://github.com/yourusername/spider-blog/issues)
- 邮箱: your.email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
