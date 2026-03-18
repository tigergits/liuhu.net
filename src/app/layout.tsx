import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/footer'
import { CookieConsent } from '@/components/cookie-consent'
import { GoogleAnalytics } from '@/components/google-analytics'
import '@/app/globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '程序员刘虎的故事 - 25+年全栈工程师的个人网站',
    template: '%s',
  },
  description: '刘虎，25+年开发经验的全栈工程师。这里记录了一个程序员的随笔、故事、日记、游记和技术文摘。',
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="程序员刘虎的故事"
          href="/feed.xml"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieConsent />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
