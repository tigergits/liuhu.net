import { Metadata } from 'next'
import { Mail, MessageSquare, Github, Globe, ExternalLink, Code2, MapPin, Coffee } from 'lucide-react'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'liuhu@liuhu.net'
const CONTACT_QQ = process.env.CONTACT_QQ || ''
const CONTACT_GITHUB = process.env.CONTACT_GITHUB || 'https://github.com/liuhu'
const CONTACT_GITEE = process.env.CONTACT_GITEE || 'https://gitee.com/liuhu'

export const metadata: Metadata = {
  title: '联系我 - 程序员刘虎的故事',
  description: '联系程序员刘虎，通过邮件、QQ、GitHub、Gitee等方式与我取得联系。25+年全栈开发经验，乐于交流技术与生活。',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: '联系我 - 程序员刘虎的故事',
    description: '联系程序员刘虎，通过邮件、QQ、GitHub、Gitee等方式与我取得联系。',
    url: `${SITE_URL}/contact`,
    siteName: '程序员刘虎的故事',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary',
    title: '联系我 - 程序员刘虎的故事',
    description: '联系程序员刘虎，通过邮件、QQ、GitHub、Gitee等方式与我取得联系。',
  },
}

const contactMethods = [
  {
    id: 'email',
    label: '电子邮件',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
    description: '最可靠的联系方式，通常在24小时内回复',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    iconBg: 'bg-blue-500/15',
  },
  ...(CONTACT_QQ
    ? [
        {
          id: 'qq',
          label: 'QQ',
          value: CONTACT_QQ,
          href: `tencent://message/?uin=${CONTACT_QQ}&Site=&Menu=yes`,
          icon: MessageSquare,
          description: '可以即时交流，工作时间在线',
          color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
          iconBg: 'bg-cyan-500/15',
        },
      ]
    : []),
  {
    id: 'github',
    label: 'GitHub',
    value: CONTACT_GITHUB.replace('https://github.com/', '@'),
    href: CONTACT_GITHUB,
    icon: Github,
    description: '查看我的开源项目，欢迎 Star 和 PR',
    color: 'bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20',
    iconBg: 'bg-gray-500/15',
  },
  {
    id: 'gitee',
    label: 'Gitee',
    value: CONTACT_GITEE.replace('https://gitee.com/', '@'),
    href: CONTACT_GITEE,
    icon: Code2,
    description: '国内代码托管平台，部分项目在此维护',
    color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    iconBg: 'bg-red-500/15',
  },
  {
    id: 'website',
    label: '个人网站',
    value: 'www.liuhu.net',
    href: SITE_URL,
    icon: Globe,
    description: '您正在浏览的这个网站，记录了我25+年的编程人生',
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    iconBg: 'bg-indigo-500/15',
  },
]

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: '联系程序员刘虎',
    description: '通过邮件、QQ、GitHub、Gitee等方式联系程序员刘虎',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: '刘虎',
      url: SITE_URL,
      email: CONTACT_EMAIL,
      sameAs: [CONTACT_GITHUB, CONTACT_GITEE].filter(Boolean),
      jobTitle: '全栈开发工程师',
      knowsAbout: ['Web开发', '全栈工程', 'TypeScript', 'React', 'Next.js'],
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
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-background">
          <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-800/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="面包屑导航" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <a href="/" className="transition-colors hover:text-foreground">
                    首页
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium">联系我</li>
              </ol>
            </nav>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Coffee className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                联系我
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                我是刘虎，一位拥有25+年开发经验的全栈工程师。
                <br className="hidden sm:inline" />
                无论是技术交流、项目合作，还是只是想聊聊天，都欢迎通过以下方式与我联系。
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <a
                  key={method.id}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group relative flex flex-col rounded-xl border p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${method.color}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${method.iconBg}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-foreground">{method.label}</h2>
                        {method.href.startsWith('http') && (
                          <ExternalLink className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                        )}
                      </div>
                      <p className="mt-0.5 font-mono text-sm opacity-80">{method.value}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 rounded-xl border border-border/60 bg-muted/30 p-8 text-center">
            <MapPin className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
            <h2 className="font-serif text-lg font-semibold text-foreground">关于回复时间</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              由于日常工作较忙，邮件通常会在 1-3
              个工作日内回复。如果是紧急事务，建议通过 QQ
              联系。感谢您的理解与耐心。
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
