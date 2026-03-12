import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [{ label: "首页", href: "/" }, ...items]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://www.liuhu.net${item.href}` }
        : {}),
    })),
  }

  return (
    <nav aria-label="面包屑导航" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/50" />
              )}
              {isLast || !item.href ? (
                <span
                  className={`flex items-center gap-1 ${
                    isLast
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {index === 0 && <Home className="h-3.5 w-3.5" />}
                  <span className="max-w-[200px] truncate">{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  {index === 0 && <Home className="h-3.5 w-3.5" />}
                  <span className="max-w-[200px] truncate">{item.label}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
