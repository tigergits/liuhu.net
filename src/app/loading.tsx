export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero skeleton */}
      <div className="mb-12">
        <div className="skeleton-pulse mb-4 h-10 w-3/4 max-w-lg" />
        <div className="skeleton-pulse mb-2 h-5 w-full max-w-2xl" />
        <div className="skeleton-pulse h-5 w-2/3 max-w-xl" />
      </div>

      {/* Content grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="skeleton-pulse h-4 w-20 rounded-full" />
              <div className="skeleton-pulse h-4 w-24" />
            </div>
            <div className="skeleton-pulse mb-3 h-6 w-5/6" />
            <div className="space-y-2">
              <div className="skeleton-pulse h-4 w-full" />
              <div className="skeleton-pulse h-4 w-full" />
              <div className="skeleton-pulse h-4 w-3/4" />
            </div>
            <div className="mt-5 flex items-center gap-2">
              <div className="skeleton-pulse h-3 w-16" />
              <div className="skeleton-pulse h-3 w-3" />
              <div className="skeleton-pulse h-3 w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <svg
          className="h-5 w-5 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span>加载中...</span>
      </div>
    </div>
  )
}
