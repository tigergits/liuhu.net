import Link from 'next/link'

interface CategoryCardProps {
  code: string
  name: string
  path: string
  icon: string
  description: string
  postCount: number
}

export function CategoryCard({
  code,
  name,
  path,
  icon,
  description,
  postCount,
}: CategoryCardProps) {
  return (
    <Link
      href={path}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6" />
      <div className="relative">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {postCount} 篇文章
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          进入阅读
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}
