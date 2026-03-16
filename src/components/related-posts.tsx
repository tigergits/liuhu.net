"use client"

import Link from "next/link"
import { BookOpen, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"
import { CATEGORIES } from "@/lib/types"

interface RelatedPostsProps {
  currentPost: Post
  allPosts: Post[]
  maxCount?: number
}

function getPostUrl(post: Post): string {
  return `/${post.category}/${post.slug}.htm`
}

function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  maxCount: number
): Post[] {
  const scored = allPosts
    .filter((p) => p.slug !== currentPost.slug || p.category !== currentPost.category)
    .map((post) => {
      let score = 0

      // Same category gets a big boost
      if (post.category === currentPost.category) {
        score += 50
      }

      // Date proximity (closer dates score higher)
      const currentDate = new Date(currentPost.date).getTime()
      const postDate = new Date(post.date).getTime()
      const daysDiff = Math.abs(currentDate - postDate) / (1000 * 60 * 60 * 24)
      if (daysDiff < 30) score += 20
      else if (daysDiff < 90) score += 15
      else if (daysDiff < 365) score += 10
      else if (daysDiff < 365 * 3) score += 5

      // Title keyword overlap
      const currentWords = new Set(
        currentPost.title.replace(/[^\u4e00-\u9fff\w]/g, " ").split(/\s+/).filter((w) => w.length > 1)
      )
      const postWords = post.title.replace(/[^\u4e00-\u9fff\w]/g, " ").split(/\s+/).filter((w) => w.length > 1)
      for (const word of postWords) {
        if (currentWords.has(word)) {
          score += 10
        }
      }

      // Small random factor to vary results
      score += Math.random() * 3

      return { post, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount)

  return scored.map((s) => s.post)
}

export function RelatedPosts({
  currentPost,
  allPosts,
  maxCount = 5,
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentPost, allPosts ?? [], maxCount)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <aside className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-foreground">
          相关文章
        </h3>
      </div>
      <nav aria-label="相关文章">
        <ul className="space-y-1">
          {relatedPosts.map((post) => {
            const categoryInfo = CATEGORIES[post.category as keyof typeof CATEGORIES]
            const postUrl = getPostUrl(post)

            return (
              <li key={`${post.category}-${post.slug}`}>
                <Link
                  href={postUrl}
                  className="group flex flex-col gap-1.5 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-accent"
                >
                  <span className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.date}>{post.date}</time>
                    {categoryInfo && post.category !== currentPost.category && (
                      <Badge
                        variant="outline"
                        className="h-4 px-1.5 text-[10px] font-normal"
                      >
                        {categoryInfo.name}
                      </Badge>
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Link to category page */}
      {(() => {
        const catInfo = CATEGORIES[currentPost.category as keyof typeof CATEGORIES]
        if (!catInfo) return null
        return (
          <div className="mt-4 border-t pt-3">
            <Link
              href={catInfo.path}
              className="flex items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
            >
              查看更多「{catInfo.name}」
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )
      })()}
    </aside>
  )
}

export default RelatedPosts
