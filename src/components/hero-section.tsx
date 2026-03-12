import Image from 'next/image'
import { SocialLinks } from '@/components/social-links'

interface HeroSectionProps {
  totalPosts: number
  yearsActive: number
}

export function HeroSection({ totalPosts, yearsActive }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-blue-500 blur-[128px]" />
        <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-indigo-500 blur-[128px]" />
      </div>
      {/* Code pattern background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <pre className="h-full overflow-hidden whitespace-pre-wrap font-mono text-xs leading-5 text-white">
          {`function life() {\n  const passion = "programming";\n  const years = 25;\n  const cities = ["长沙", "深圳", "上海", "杭州"];\n  \n  while (true) {\n    learn();\n    code();\n    share();\n    if (tired) { coffee(); }\n  }\n}\n\nclass Developer {\n  constructor() {\n    this.name = "刘虎";\n    this.experience = "25+ years";\n    this.stack = "fullstack";\n  }\n  \n  solve(problem) {\n    return this.think(problem)\n      .then(this.code)\n      .then(this.test)\n      .then(this.deploy);\n  }\n}\n\n// Keep coding, keep learning\nlife();`}
        </pre>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-75 blur" />
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white/20 bg-slate-800 md:h-48 md:w-48">
                <Image
                  src="/images/myphoto_070418.gif"
                  alt="刘虎"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-slate-900 bg-green-500" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              全栈工程师 · {yearsActive}+ 年编程经验
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              程序员刘虎
              <span className="mt-1 block text-lg font-normal text-slate-400 md:text-xl">
                的故事
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300/90 md:text-lg">
              刘虎，一般人称老虎，半路出家的挨踢行业从业人员。十多年前迷上了写程序后一发不可收拾，
              曾经小干过些疯狂的举动，不知天高地厚的闯过些城市。现在依然整天与电脑为伍，
              依然不修边幅，喜欢干通宵，依然有股子想去环游世界的冲动....
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {['TypeScript', 'React', 'Node.js', 'Full Stack', 'C/C++', '25+ Years'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-xs text-slate-400"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <SocialLinks variant="hero" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full text-background"
        >
          <path
            d="M0 48h1440V24C1440 24 1320 0 1200 0S960 24 720 24 480 0 360 0 0 24 0 24v24z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
