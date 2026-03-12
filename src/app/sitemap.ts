import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
import { getAllPosts } from '@/lib/posts'
import { CATEGORIES } from '@/lib/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about.htm`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = Object.values(CATEGORIES).map(
    (cat) => ({
      url: `${SITE_URL}${cat.htmPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  )

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: post.canonical || `${SITE_URL}/${post.category}/${post.slug}.htm`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...postPages]
}
