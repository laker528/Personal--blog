import Head from 'next/head';
import { blogConfig } from '@/config/blog';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
}

export default function SEO({
  title,
  description = blogConfig.siteDescription,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  author = blogConfig.author.name,
}: SEOProps) {
  const siteTitle = title ? `${title} | ${blogConfig.siteName}` : blogConfig.siteName;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/images/og-default.jpg`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'BlogPosting' : 'WebSite',
    headline: title,
    description,
    image: imageUrl,
    url: fullUrl,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: blogConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
    ...(tags && { keywords: tags.join(', ') }),
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      {tags && <meta name="keywords" content={tags.join(', ')} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={blogConfig.siteName} />
      <meta property="og:locale" content="zh_CN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {tags && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@yourusername" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}

// RSS Feed component
export function RSSFeed() {
  return (
    <Head>
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${blogConfig.siteName} RSS Feed`}
        href="/feed.xml"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title={`${blogConfig.siteName} Atom Feed`}
        href="/atom.xml"
      />
    </Head>
  );
}

// Favicon component
export function Favicon() {
  return (
    <Head>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#3b82f6" />
    </Head>
  );
}
