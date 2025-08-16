export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  coverImage?: string;
  readingTime: number;
  published: boolean;
}

export interface BlogMetadata {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  coverImage?: string;
  published: boolean;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface Tag {
  name: string;
  slug: string;
  count: number;
}

export interface BlogConfig {
  siteName: string;
  siteDescription: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
    social: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      email?: string;
    };
  };
  postsPerPage: number;
  featuredPostsCount: number;
}
