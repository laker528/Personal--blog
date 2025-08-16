import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import ErrorBoundary from '@/components/ErrorBoundary'
import { blogConfig } from '@/config/blog'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: blogConfig.siteName,
    template: `%s | ${blogConfig.siteName}`,
  },
  description: blogConfig.siteDescription,
  keywords: ['博客', '技术', '前端', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: blogConfig.author.name }],
  creator: blogConfig.author.name,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com',
    title: blogConfig.siteName,
    description: blogConfig.siteDescription,
    siteName: blogConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: blogConfig.siteName,
    description: blogConfig.siteDescription,
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
