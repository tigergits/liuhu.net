"use client"

import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"
import { CATEGORIES } from "@/lib/types"

interface PostCardProps {
  post: Post
  variant?: "default" | "compact" | "featured"
}

function estimateReadingTime(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, "").replace(/\s+/g, "")
  const chineseChars = plainText.match(/[\u4e00-\u9fff]/g)?.length || 0
  const englishWords = plainText.replace(/[\u4e00-\u9fff]/g, " ").split(/\s+/).filter(Boolean).length
  const totalWords = chineseChars + englishWords
  return Math.max(1, Math.ceil(totalWords / 500))
}

function getExcerpt(rawContent: string, maxLength: number = 120): string {
  const withoutFrontmatter = rawContent.replace(/^---[\s\S]*?---/, "").trim()
  const withoutHeadings = withoutFrontmatter.replace(/^#{1,6}\s+.*$/gm, "")
  const withoutImages = withoutHeadings.replace(/!\[.*?\]\(.*?\)/g, "")
  const withoutLinks = withoutImages.replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
  const withoutComments = withoutLinks.replace(/## 留言[\s\S]*$/, "")
  const withoutMarkdown = withoutComments
    .replace(/[*_~`>#\-|]/g, "")
    .replace(/\n+/g, " ")
    .trim()

  if (withoutMarkdown.length <= maxLength) return withoutMarkdown
  return withoutMarkdown.slice(0, maxLength).replace(/\s+\S*$/, "") + "…"
}

function getPostUrl(post: Post): string {
  return `/${post.category}/${post.slug}.htm`
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const excerpt = getExcerpt(post.rawContent || "")
  const categoryInfo = CATEGORIES[post.category as keyof typeof CATEGORIES]
  const postUrl = getPostUrl(post)

  if (variant === "compact") {
    return (
      <Link href={postUrl} className="group block">
        <div className="flex items-start gap-3 rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-border hover:bg-accent/50">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
            {post.date.slice(5, 7)}/{post.date.slice(8, 10)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              {categoryInfo && (
                <Badge variant="outline" className="h-4 px-1 text-[10px]">
                  {categoryInfo.name}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "featured") {
    return (
      <Link href={postUrl} className="group block">
        <Card className="overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 px-6 pb-2 pt-6">
            <div className="flex items-center gap-2">
              {categoryInfo && (
                <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary">
                  {categoryInfo.name}
                </Badge>
              )}
            </div>
            <h2 className="mt-3 text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {post.title}
            </h2>
          </div>
          <CardContent className="px-6 pt-4">
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between px-6 pb-5">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {post.date}
              </span>
              {post.comments && post.comments.length > 0 && (
                <span>{post.comments.length} 条留言</span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              阅读全文 <ArrowRight className="h-3 w-3" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    )
  }

  // Default variant
  return (
    <Link href={postUrl} className="group block">
      <Card className="overflow-hidden border transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {categoryInfo && (
                <Badge
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {categoryInfo.name}
                </Badge>
              )}
            </div>
          </div>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-6 py-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            阅读全文 <ArrowRight className="h-3 w-3" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default PostCard
