import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { CATEGORIES } from '@/lib/types'
import { CategoryCard } from '@/components/category-card'
import { PostCard } from '@/components/post-card'
import { SocialLinks } from '@/components/social-links'
import { HeroSection } from '@/components/hero-section'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'
const siteName = '程序员刘虎的故事'
const siteDescription = '刘虎，25+年开发经验的全栈工程师。这里记录了一个程序员的随笔、故事、日记、游记和技术文摘。'

export const metadata: Metadata = {
  title: `${siteName} - 25+年全栈工程师的个人网站`,
  description: siteDescription,
  keywords: ['程序员', '刘虎', '全栈工程师', '技术博客', '程序员故事', '开发经验', 'IT从业者'],
  authors: [{ name: '刘虎', url: siteUrl }],
  creator: '刘虎',
  openGraph: {
    title: `${siteName} - 25+年全栈工程师的个人网站`,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/myphoto_070418.gif`,
        width: 200,
        height: 200,
        alt: '刘虎',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${siteName} - 25+年全栈工程师的个人网站`,
    description: siteDescription,
    images: [`${siteUrl}/images/myphoto_070418.gif`],
  },
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
}

function getJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: '刘虎',
      url: siteUrl,
      image: `${siteUrl}/images/myphoto_070418.gif`,
      jobTitle: '全栈工程师',
      description: '25+年开发经验的全栈工程师',
      sameAs: [
        process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/liuhu',
        process.env.NEXT_PUBLIC_GITEE_URL || 'https://gitee.com/liuhu',
      ].filter(Boolean),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      author: {
        '@type': 'Person',
        name: '刘虎',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://www.google.com/search?q=site:liuhu.net+{search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ]
}

const categoryIcons: Record<string, string> = {
  essay: '✍️',
  mystory: '📖',
  daily: '📅',
  trip: '🗺️',
  lhwz: '💻',
  about: '👤',
}

const categoryDescriptions: Record<string, string> = {
  essay: '生活感悟与思考，记录岁月中的点滴心得',
  mystory: '一个程序员的成长历程，从懵懂少年到资深工程师',
  daily: '日常生活的真实记录，平凡中的不平凡',
  trip: '走过的山川湖海，看过的世间风景',
  lhwz: '技术学习笔记与行业观察，25+年的技术积淀',
  about: '关于我，关于这个网站的故事',
}

export default function HomePage() {
  const allPosts = getAllPosts()
  const jsonLd = getJsonLd()

  const categorizedPosts: Record<string, typeof allPosts> = {}
  for (const [code] of Object.entries(CATEGORIES)) {
    categorizedPosts[code] = allPosts
      .filter((p) => p.category === code)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  }

  const totalPosts = allPosts.length
  const startYear = 1997
  const yearsOfExperience = new Date().getFullYear() - startYear

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <HeroSection totalPosts={totalPosts} yearsActive={yearsOfExperience} />

      {/* Stats Bar */}
      <section className="border-b border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <StatItem number={`${yearsOfExperience}+`} label="年编程经验" />
            <StatItem number={`${totalPosts}+`} label="篇原创文章" />
            <StatItem number={`${Object.keys(CATEGORIES).length}`} label="个内容分类" />
            <StatItem number="25+" label="年建站历史" />
          </div>
        </div>
      </section>

      {/* Category Navigation Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              内容分类
            </h2>
            <p className="mt-3 text-muted-foreground">
              二十余年的文字积累，记录了一个程序员的完整人生轨迹
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(CATEGORIES).map(([code, cat]) => (
              <CategoryCard
                key={code}
                code={code}
                name={cat.name}
                path={cat.path}
                icon={categoryIcons[code]}
                description={categoryDescriptions[code]}
                postCount={
                  allPosts.filter((p) => p.category === code).length
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts by Category */}
      {Object.entries(CATEGORIES)
        .filter(([code]) => code !== 'about')
        .map(([code, cat]) => {
          const posts = categorizedPosts[code]
          if (!posts || posts.length === 0) return null
          return (
            <section
              key={code}
              className="border-t border-border/50 py-16 even:bg-muted/20"
            >
              <div className="mx-auto max-w-6xl px-4">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryIcons[code]}</span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {cat.name}
                    </h2>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {allPosts.filter((p) => p.category === code).length} 篇
                    </span>
                  </div>
                  <Link
                    href={cat.path}
                    className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    查看全部
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}

      {/* Timeline / About Section */}
      <section className="border-t border-border/50 bg-gradient-to-b from-muted/30 to-background py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            时光轴
          </h2>
          <p className="mt-3 mb-10 text-muted-foreground">
            从1997年到现在，一个程序员的关键时刻
          </p>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
            <div className="space-y-8">
              {[
                { year: '1997', event: '第一次接触互联网，开始建立个人网站' },
                { year: '1999', event: '正式踏入IT行业，开始程序员生涯' },
                { year: '2002', event: '辗转多个城市，积累了丰富的开发经验' },
                { year: '2004', event: '网站内容逐渐丰富，记录技术成长' },
                { year: '2010', event: '从后端到全栈，技术栈不断拓展' },
                { year: '至今', event: '25+年坚持编程，依然热爱技术' },
              ].map((item, i) => (
                <div
                  key={item.year}
                  className={`flex items-center gap-4 ${
                    i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      i % 2 === 0 ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div className="inline-block rounded-lg border border-border bg-card p-4 shadow-sm">
                      <span className="block text-sm font-bold text-primary">
                        {item.year}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.event}
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            欢迎来到我的数字世界
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            这个网站从1997年开始，记录了一个程序员二十余年的成长故事。
            无论你是刚入行的新人，还是同样在这条路上走了很久的老兵，
            希望这些文字能给你带来一些共鸣和启发。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/mystory"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              阅读我的故事
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              联系我
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-primary">{number}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
