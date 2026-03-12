export const dynamic = 'force-static'

import { getAllPosts } from '@/lib/posts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'
const SITE_TITLE = '程序员刘虎的故事'
const SITE_DESCRIPTION =
  '刘虎，一位拥有25+年开发经验的全栈工程师的个人网站。分享编程随笔、技术文摘、人生故事与游记。'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export async function GET() {
  const posts = getAllPosts()
  const recentPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20)

  const itemsXml = recentPosts
    .map((post) => {
      const link =
        post.canonical ||
        `${SITE_URL}/${post.category}/${post.slug}.htm`
      const description = post.description
        ? escapeXml(post.description)
        : escapeXml(stripHtml(post.content).substring(0, 200))
      const pubDate = new Date(post.date).toUTCString()

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.categoryName)}</category>
    </item>`
    })
    .join('\n')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Next.js</generator>
    <managingEditor>liuhu@liuhu.net (刘虎)</managingEditor>
    <webMaster>liuhu@liuhu.net (刘虎)</webMaster>
    <copyright>Copyright © 1997-${new Date().getFullYear()} 刘虎. All rights reserved.</copyright>
    <image>
      <url>${SITE_URL}/images/myphoto_070418.gif</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>
${itemsXml}
  </channel>
</rss>`

  return new Response(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
