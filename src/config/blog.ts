import { BlogConfig } from '@/types/blog';

export const blogConfig: BlogConfig = {
  siteName: 'Lakeminder Blog',
  siteDescription: '一个现代化的个人博客，分享技术、生活和思考',
  author: {
    name: 'lakeminder',
    bio: '热爱技术，喜欢分享，学习中的小白一枚！！',
    avatar: '/images/avatar.jpg',
    social: {
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
      email: '2893686400@qq.com',
    },
  },
  postsPerPage: 6,
  featuredPostsCount: 3,
};
