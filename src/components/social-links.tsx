import Link from 'next/link'

interface SocialLinksProps {
  variant?: 'hero' | 'footer' | 'default'
}

export function SocialLinks({ variant = 'default' }: SocialLinksProps) {
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/liuhu'
  const gitee = process.env.NEXT_PUBLIC_GITEE_URL || 'https://gitee.com/liuhu'
  const email = process.env.NEXT_PUBLIC_EMAIL || 'liuhu@liuhu.net'

  const isHero = variant === 'hero'
  const isFooter = variant === 'footer'

  const linkClass = isHero
    ? 'inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white'
    : isFooter
      ? 'inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
      : 'inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="GitHub"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        {isHero && <span>GitHub</span>}
      </a>
      <a
        href={gitee}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="Gitee"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H8.37a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h5.852z" />
        </svg>
        {isHero && <span>Gitee</span>}
      </a>
      <a
        href={`mailto:${email}`}
        className={linkClass}
        aria-label="Email"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {isHero && <span>Email</span>}
      </a>
      {isHero && (
        <Link
          href="/feed.xml"
          className={linkClass}
          aria-label="RSS"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <span>RSS</span>
        </Link>
      )}
    </div>
  )
}
