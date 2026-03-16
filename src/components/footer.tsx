import Link from "next/link"
import { Code2, Rss } from "lucide-react"

const CATEGORY_LINKS = [
  { name: "随笔", href: "/essay.htm" },
  { name: "我的故事", href: "/mystory.htm" },
  { name: "我的日记", href: "/daily.htm" },
  { name: "我的游记", href: "/trip.htm" },
  { name: "技术文摘", href: "/lhwz.htm" },
  { name: "关于", href: "/about.htm" },
]

const LEGAL_LINKS = [
  { name: "隐私政策", href: "/privacy" },
  { name: "服务条款", href: "/terms" },
  { name: "联系我", href: "/contact" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight">
                程序员刘虎的故事
              </span>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              一个 25+ 年开发经验的全栈工程师的个人网站，记录技术、生活与思考。
            </p>
            <div className="mt-4">
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label="RSS 订阅"
              >
                <Rss className="h-3.5 w-3.5" />
                RSS 订阅
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              文章分类
            </h3>
            <ul className="space-y-2">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              相关链接
            </h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Quick */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              联系方式
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {process.env.NEXT_PUBLIC_EMAIL && (
                <li>
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {process.env.NEXT_PUBLIC_EMAIL}
                  </a>
                </li>
              )}
              {process.env.NEXT_PUBLIC_GITHUB && (
                <li>
                  <a
                    href={process.env.NEXT_PUBLIC_GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {process.env.NEXT_PUBLIC_SITE_URL && (
                <li>
                  <a
                    href={process.env.NEXT_PUBLIC_SITE_URL}
                    className="transition-colors hover:text-foreground"
                  >
                    {process.env.NEXT_PUBLIC_SITE_URL}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 1997–{currentYear} 刘虎。保留所有权利。</p>
          <p className="flex items-center gap-1.5">
            由{" "}
            <a
              href="https://www.anthropic.com/claude"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Claude AI
            </a>
            {" "}辅助开发 ·{" "}
            <a
              href="https://github.com/tigergits/liuhu.net"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              代码开源
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
