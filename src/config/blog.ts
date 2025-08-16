import { BlogConfig } from '@/types/blog';

export const blogConfig: BlogConfig = {
  siteName: 'Spider Blog',
  siteDescription: '一个现代化的个人博客，分享技术、生活和思考',
  author: {
    name: '博主',
    bio: '热爱技术，喜欢分享，专注于前端开发和全栈技术。',
    avatar: '/images/avatar.jpg',
    social: {
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
      email: 'your.email@example.com',
    },
  },
  postsPerPage: 6,
  featuredPostsCount: 3,
};
