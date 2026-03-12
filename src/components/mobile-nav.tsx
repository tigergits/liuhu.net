"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Github, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Code2 } from "lucide-react"

interface NavItem {
  name: string
  href: string
}

interface MobileNavProps {
  items: NavItem[]
  githubUrl: string
}

export function MobileNav({ items, githubUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[360px]">
        <SheetHeader className="text-left">
          <SheetTitle>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight">
                程序员刘虎的故事
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}

          <div className="my-4 border-t" />

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            联系我
          </Link>

          <Link
            href="/privacy"
            onClick={() => setOpen(false)}
            className="flex items-center rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            隐私政策
          </Link>

          <Link
            href="/terms"
            onClick={() => setOpen(false)}
            className="flex items-center rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            服务条款
          </Link>

          <div className="my-4 border-t" />

          {/* External Links */}
          <div className="flex items-center gap-2 px-3">
            <Button variant="outline" size="icon" className="h-9 w-9" asChild>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" asChild>
              <a href="/feed.xml" aria-label="RSS 订阅">
                <Rss className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 text-xs text-muted-foreground">
          © 1997–{new Date().getFullYear()} 刘虎
        </div>
      </SheetContent>
    </Sheet>
  )
}
