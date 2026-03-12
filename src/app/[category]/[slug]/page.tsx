import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIES, type CategoryCode } from '@/lib/types'
import { getPostBySlug, getPostsByCategory, getAllPosts } from '@/lib/posts'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedPosts } from '@/components/related-posts'
import { SocialShare } from '@/components/social-share'
import { PostComments } from '@/components/post-comments'
import { JsonLd } from '@/components/json-ld'
import { CalendarDays, FolderOpen } from 'lucide-react'
import Link from 'next/link'

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const allPosts = getAllPosts()
  return allPosts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params
  const post = getPostBySlug(category as CategoryCode, slug)
  if (!post) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'
  const title = `${post.title} - 程序员刘虎的故事`
  const description = post.description || post.title

  return {
    title,
    description,
    alternates: {
      canonical: post.canonical,
    },
    openGraph: {
      title,
      description,
      url: post.canonical,
      siteName: '程序员刘虎的故事',
      type: 'article',
      locale: 'zh_CN',
      publishedTime: post.date,
      authors: ['刘虎'],
      section: post.categoryName,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

function estimateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, '')
  const charCount = text.length
  const wordsPerMinute = 400
  return Math.max(1, Math.ceil(charCount / wordsPerMinute))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params

  const cat = CATEGORIES[category as keyof typeof CATEGORIES]
  if (!cat) {
    notFound()
  }

  const post = getPostBySlug(category as CategoryCode, slug)
  if (!post) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'

  const allCategoryPosts = getPostsByCategory(category as CategoryCode)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: '刘虎',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: '刘虎',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.canonical,
    },
    url: post.canonical,
    articleSection: post.categoryName,
    inLanguage: 'zh-CN',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cat.name,
        item: `${siteUrl}/${category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: post.canonical,
      },
    ],
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="container-content py-8">
        <Breadcrumb
          items={[
            { label: '首页', href: '/' },
            { label: cat.name, href: `/${category}` },
            { label: post.title },
          ]}
        />

        <div className="mt-8 flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <Link
                  href={`/${category}`}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <FolderOpen className="w-4 h-4" />
                  {post.categoryName}
                </Link>
              </div>

              <div className="mt-4">
                <SocialShare
                  url={post.canonical}
                  title={post.title}
                  description={post.description || post.title}
                />
              </div>
            </header>

            <div
              className="prose prose-slate dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-5
                prose-h3:text-lg prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-base prose-p:leading-[1.9] prose-p:my-6 prose-p:text-foreground/90
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-slate-900 prose-pre:dark:bg-slate-800 prose-pre:rounded-lg prose-pre:my-8
                prose-strong:text-foreground
                prose-li:text-foreground/90 prose-li:my-2 prose-li:leading-[1.8]
                prose-ul:my-6 prose-ol:my-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.comments && post.comments.length > 0 && (
              <div className="mt-12">
                <PostComments comments={post.comments} />
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-border">
              <SocialShare
                url={post.canonical}
                title={post.title}
                description={post.description || post.title}
              />
            </div>

            {/* Post navigation */}
            <PostNavigation
              category={category}
              currentSlug={slug}
              posts={allCategoryPosts}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <RelatedPosts currentPost={post} allPosts={allCategoryPosts} />

              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                  关于作者
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://www.liuhu.net/images/myphoto_070418.gif"
                    alt="刘虎"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-foreground">刘虎</p>
                    <p className="text-xs text-muted-foreground">全栈工程师 · 25+年经验</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  半路出家的IT从业人员，迷上写程序后一发不可收拾。
                </p>
                <Link
                  href="/about"
                  className="inline-block mt-3 text-sm text-primary hover:underline"
                >
                  了解更多 →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function PostNavigation({
  category,
  currentSlug,
  posts,
}: {
  category: string
  currentSlug: string
  posts: Array<{ slug: string; title: string }>
}) {
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug)
  if (currentIndex === -1) return null

  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null

  if (!prevPost && !nextPost) return null

  return (
    <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="文章导航">
      {prevPost ? (
        <Link
          href={`/${category}/${prevPost.slug}`}
          className="group flex flex-col p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all"
        >
          <span className="text-xs text-muted-foreground mb-1">← 上一篇</span>
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link
          href={`/${category}/${nextPost.slug}`}
          className="group flex flex-col items-end text-right p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all"
        >
          <span className="text-xs text-muted-foreground mb-1">下一篇 →</span>
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
