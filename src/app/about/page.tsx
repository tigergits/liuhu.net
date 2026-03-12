import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Code, Briefcase, Heart, ExternalLink, ArrowRight } from 'lucide-react'
import { getPostsByCategory } from '@/lib/posts'
import { Breadcrumb } from '@/components/breadcrumb'

export const metadata: Metadata = {
  title: '关于刘虎 - 程序员刘虎的故事',
  description: '刘虎，一个拥有25+年开发经验的全栈工程师。从中专学会计到成为程序员，从长沙到北京再到SOHO，一个普通程序员的不普通历程。',
  alternates: {
    canonical: 'https://www.liuhu.net/about.htm',
  },
  openGraph: {
    title: '关于刘虎 - 程序员刘虎的故事',
    description: '刘虎，一个拥有25+年开发经验的全栈工程师。从中专学会计到成为程序员，从长沙到北京再到SOHO，一个普通程序员的不普通历程。',
    url: 'https://www.liuhu.net/about.htm',
    type: 'profile',
    images: [
      {
        url: 'https://www.liuhu.net/images/myphoto_070418.gif',
        width: 200,
        height: 200,
        alt: '刘虎',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: '关于刘虎 - 程序员刘虎的故事',
    description: '刘虎，一个拥有25+年开发经验的全栈工程师。',
  },
}

const timeline = [
  {
    year: '1993',
    title: '初遇电脑',
    location: '长沙',
    description: '中专学会计，却在机房里迷上了电脑，从此一发不可收拾。用坏键盘和泡沫纸练打字，废寝忘食学习C语言和Foxbase。',
    icon: Heart,
    color: 'bg-pink-500',
  },
  {
    year: '1997',
    title: '正式入行',
    location: '长沙',
    description: '中专毕业后正式踏入IT行业，在长沙开始了程序员生涯。建立了个人网站 liuhu.net，开始记录技术与生活。',
    icon: Code,
    color: 'bg-blue-500',
  },
  {
    year: '1999',
    title: '机关工作',
    location: '长沙',
    description: '在机关单位负责信息化工作，接触了更多实际项目开发，技术能力得到了系统性的提升。',
    icon: Briefcase,
    color: 'bg-green-500',
  },
  {
    year: '2001',
    title: '北漂岁月',
    location: '北京',
    description: '不知天高地厚闯到北京，加入软件公司，接触到了更广阔的技术世界。在北京经历了程序员生涯中最重要的成长阶段。',
    icon: MapPin,
    color: 'bg-orange-500',
  },
  {
    year: '2003',
    title: 'SOHO开发者',
    location: '上海',
    description: '成为自由职业开发者，独立承接项目，掌握了从需求分析到部署上线的全栈能力。体验了自由但也充满挑战的SOHO生活。',
    icon: Code,
    color: 'bg-purple-500',
  },
  {
    year: '2005',
    title: '回到长沙',
    location: '长沙',
    description: '在外漂泊多年后回到出发的城市。虽然并没有如当初所愿成为什么高手，但从未后悔当初的决定。',
    icon: MapPin,
    color: 'bg-teal-500',
  },
  {
    year: '至今',
    title: '持续编码',
    location: '',
    description: '25+年来始终保持对编程的热爱，从C语言到现代全栈开发，技术栈不断演进，但那份最初的热情从未改变。',
    icon: Heart,
    color: 'bg-red-500',
  },
]

const skills = [
  { name: 'C/C++', level: 95, category: '系统编程' },
  { name: 'Delphi', level: 90, category: '桌面开发' },
  { name: 'C#', level: 85, category: '.NET' },
  { name: 'ASP', level: 80, category: 'Web开发' },
  { name: 'Java', level: 75, category: '企业开发' },
  { name: 'PowerBuilder', level: 80, category: '数据库开发' },
  { name: 'VB', level: 75, category: '快速开发' },
  { name: 'ASM', level: 70, category: '底层开发' },
]

const skillCategories = [
  {
    title: '编程语言',
    items: ['C/C++', 'Delphi/Pascal', 'C#', 'Java', 'VB/VBA', 'ASM', 'PowerBuilder', 'JavaScript'],
  },
  {
    title: 'Web技术',
    items: ['ASP/ASP.NET', 'HTML/CSS', 'Next.js', 'React', 'Node.js'],
  },
  {
    title: '数据库',
    items: ['SQL Server', 'MySQL', 'Oracle', 'Foxpro/Foxbase', 'Access'],
  },
  {
    title: '操作系统',
    items: ['Windows', 'Linux', 'DOS', 'Novell'],
  },
]

export default function AboutPage() {
  const aboutPosts = getPostsByCategory('about')

  const storyPosts = [
    { title: '十六岁以前', slug: 'About-133', date: '2000-10-01' },
    { title: '中专四年', slug: 'About-134', date: '2000-10-02' },
    { title: '在长沙两年', slug: 'About-135', date: '2000-10-03' },
    { title: '漂泊在北京', slug: 'About-136', date: '2000-10-04' },
  ]

  // Try to get actual posts from the about category
  const actualStoryPosts = aboutPosts.filter((p) =>
    ['About-133', 'About-134', 'About-135', 'About-136'].includes(p.slug)
  )

  const displayPosts = actualStoryPosts.length > 0
    ? actualStoryPosts.map((p) => ({ title: p.title, slug: p.slug, date: p.date }))
    : storyPosts

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: '刘虎',
      alternateName: '老虎',
      description: '全栈开发工程师，25+年开发经验',
      url: 'https://www.liuhu.net',
      image: 'https://www.liuhu.net/images/myphoto_070418.gif',
      jobTitle: '全栈开发工程师',
      knowsAbout: ['C/C++', 'Delphi', 'C#', 'ASP', 'Java', 'PowerBuilder', 'VB', 'ASM', 'Web Development'],
      sameAs: [
        process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/liuhu',
        process.env.NEXT_PUBLIC_GITEE_URL || 'https://gitee.com/liuhu',
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 dark:from-black dark:via-slate-900 dark:to-indigo-950 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <Breadcrumb
              items={[{ label: '关于', href: '/about' }]}
            />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <Image
                      src="https://www.liuhu.net/images/myphoto_070418.gif"
                      alt="刘虎"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    25+ 年
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 font-serif">
                  刘虎
                </h1>
                <p className="text-xl md:text-2xl text-blue-300 mb-4 font-medium">
                  全栈开发工程师 / 25+ 年经验
                </p>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                  一般人称老虎，半路出家的挨踢（这行有人也叫它IT）行业从业人员，十多年前迷上了写程序后一发不可收拾，
                  曾经小干过些疯狂的举动，不知天高地厚的闯过些城市，眼看即将步入而立之年，
                  又回到了出发的城市，看看这十年，并没有如当初所愿成为什么高手，不过也并没有后悔自己当初的决定。
                </p>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                  现在依然整天与电脑为伍，依然是不修边幅，喜欢干通宵，打起游戏不要命，
                  依然性格内向不善与人交往，依然有股子想去环游世界的冲动....
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {['C/C++', 'Delphi', 'C#', 'ASP.NET', 'Java', 'PowerBuilder', 'VB', 'ASM', 'Full Stack'].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-slate-200 hover:bg-white/20 transition-colors"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Timeline & Story */}
            <div className="lg:col-span-2 space-y-16">
              {/* Timeline Section */}
              <section>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-serif flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-blue-500" />
                  技术历程
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  从1993年初遇电脑，到如今25+年的技术之旅
                </p>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 dark:from-blue-400 dark:via-purple-400 dark:to-red-400" />

                  <div className="space-y-8">
                    {timeline.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div key={index} className="relative pl-16">
                          {/* Timeline dot */}
                          <div
                            className={`absolute left-3 w-7 h-7 rounded-full ${item.color} flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-slate-900`}
                          >
                            <Icon className="w-3.5 h-3.5 text-white" />
                          </div>

                          {/* Content card */}
                          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">
                                {item.year}
                              </span>
                              {item.location && (
                                <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {item.location}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                              {item.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>

              {/* My Story Section */}
              <section>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-serif">
                  我这些年
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  用文字记录下的那些年、那些事
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayPosts.map((post, index) => (
                    <Link
                      key={post.slug}
                      href={`/mystory/${post.slug}`}
                      className="group block bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {post.title}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                    </Link>
                  ))}
                </div>

                {/* All about posts */}
                {aboutPosts.length > 4 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
                      更多文章
                    </h3>
                    <div className="space-y-2">
                      {aboutPosts
                        .filter(
                          (p) =>
                            !['About-133', 'About-134', 'About-135', 'About-136'].includes(
                              p.slug
                            )
                        )
                        .map((post) => (
                          <Link
                            key={post.slug}
                            href={`/mystory/${post.slug}`}
                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                          >
                            <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </span>
                            <span className="text-sm text-slate-400 dark:text-slate-500">
                              {post.date}
                            </span>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column - Skills & Info */}
            <div className="space-y-8">
              {/* Skills Section */}
              <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  技术能力
                </h2>

                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {skill.category}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tech Stack Categories */}
              <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  技术栈一览
                </h2>

                <div className="space-y-6">
                  {skillCategories.map((category) => (
                    <div key={category.title}>
                      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                        {category.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Fun Facts */}
              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-indigo-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  一些数字
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      25+
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">年编程经验</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      8+
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">编程语言</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      1997
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">建站年份</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                      ∞
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">对编程的热爱</div>
                  </div>
                </div>
              </section>

              {/* Contact CTA */}
              <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  想要联系我？
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  无论是技术交流还是项目合作，欢迎联系
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                >
                  联系我
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
