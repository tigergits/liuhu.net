"use client"

import { useState } from "react"
import { MessageSquare, User, Calendar, ChevronDown, ChevronUp, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Comment } from "@/lib/types"

interface PostCommentsProps {
  comments: Comment[]
  initialDisplayCount?: number
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  // Handle both "YYYY-MM-DD HH:mm:ss" and "YYYY-MM-DD" formats
  const parts = dateStr.split(" ")
  const datePart = parts[0]
  const timePart = parts[1] || ""
  return timePart ? `${datePart} ${timePart}` : datePart
}

function isAuthorLiuhu(author: string): boolean {
  return author === "刘虎" || author.toLowerCase().includes("liuhu")
}

export function PostComments({
  comments,
  initialDisplayCount = 10,
}: PostCommentsProps) {
  const [showAll, setShowAll] = useState(false)

  if (!comments || comments.length === 0) {
    return null
  }

  const displayedComments = showAll
    ? comments
    : comments.slice(0, initialDisplayCount)
  const hasMore = comments.length > initialDisplayCount

  return (
    <section className="mt-12" aria-label="文章留言">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            历史留言
          </h2>
        </div>
        <Badge variant="secondary" className="text-xs">
          {comments.length} 条
        </Badge>
      </div>

      <p className="mb-6 text-xs text-muted-foreground">
        以下留言来自网站早期的访客互动，作为历史记录保留。
      </p>

      {/* Comments timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-5 top-0 w-px bg-border" />

        <div className="space-y-0">
          {displayedComments.map((comment, index) => {
            const isHost = isAuthorLiuhu(comment.author)

            return (
              <div
                key={`${comment.date}-${index}`}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-[14px] top-6 h-2.5 w-2.5 rounded-full border-2 ${
                    isHost
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30 bg-background"
                  }`}
                />

                {/* Comment card */}
                <div
                  className={`mb-4 rounded-lg border p-4 transition-colors hover:bg-accent/30 ${
                    isHost
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  {/* Comment header */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                          isHost
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isHost ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {comment.author}
                      </span>
                      {isHost && (
                        <Badge
                          variant="default"
                          className="h-4 px-1.5 text-[10px]"
                        >
                          站长
                        </Badge>
                      )}
                    </div>

                    {comment.date && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <time>{formatDate(comment.date)}</time>
                      </span>
                    )}
                  </div>

                  {/* Comment title */}
                  {comment.title && (
                    <div className="mb-1.5 flex items-start gap-1.5">
                      <Quote className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/50" />
                      <span className="text-sm font-medium text-foreground/80">
                        {comment.title}
                      </span>
                    </div>
                  )}

                  {/* Comment content */}
                  <div className="text-sm leading-relaxed text-foreground/90">
                    {comment.content.split("\n").map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {lineIndex > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Show more / Show less */}
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                收起留言
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                查看全部 {comments.length} 条留言
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  )
}

export default PostComments
