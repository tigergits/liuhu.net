"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSearch = () => {
    if (!query.trim()) return
    const searchUrl = `https://www.google.com/search?q=site:www.liuhu.net+${encodeURIComponent(query.trim())}`
    window.open(searchUrl, "_blank", "noopener,noreferrer")
    setIsOpen(false)
    setQuery("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="搜索"
        className="h-9 w-9 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false)
              setQuery("")
            }}
          />

          {/* Search Dialog */}
          <div className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 px-4">
            <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4">
                <Search className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索文章..."
                  className="h-14 flex-1 border-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                    aria-label="清除搜索"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>
              <div className="border-t border-border px-4 py-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>使用 Google 搜索本站内容</span>
                  <div className="flex items-center gap-2">
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                      Enter
                    </kbd>
                    <span>搜索</span>
                    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                      Esc
                    </kbd>
                    <span>关闭</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
