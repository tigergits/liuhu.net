import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'liuhu@liuhu.net'

export const metadata: Metadata = {
  title: '隐私政策 - 程序员刘虎的故事',
  description: '程序员刘虎的故事网站隐私政策，详细说明我们如何收集、使用和保护您的个人信息。',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: '隐私政策 - 程序员刘虎的故事',
    description: '了解我们如何收集、使用和保护您的个人信息。',
    url: `${SITE_URL}/privacy`,
    siteName: '程序员刘虎的故事',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear()
  const lastUpdated = '2024-01-01'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '隐私政策',
    description: '程序员刘虎的故事网站隐私政策',
    url: `${SITE_URL}/privacy`,
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      name: '程序员刘虎的故事',
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        {/* Header */}
        <section className="border-b border-border/40 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-background">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <nav aria-label="面包屑导航" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <a href="/" className="transition-colors hover:text-foreground">
                    首页
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium">隐私政策</li>
              </ol>
            </nav>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              隐私政策
            </h1>
            <p className="mt-3 text-muted-foreground">
              最后更新：{lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-p:leading-relaxed prose-li:leading-relaxed">
            <p>
              欢迎访问「程序员刘虎的故事」（以下简称"本网站"，网址：{SITE_URL}）。本网站由刘虎个人运营维护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您在使用本网站时的信息。
            </p>
            <p>
              请您在使用本网站前仔细阅读本隐私政策。继续使用本网站即表示您同意本隐私政策中的条款。
            </p>

            <h2>1. 信息收集</h2>

            <h3>1.1 自动收集的信息</h3>
            <p>当您访问本网站时，我们可能自动收集以下信息：</p>
            <ul>
              <li>
                <strong>访问日志信息：</strong>包括您的 IP 地址、浏览器类型和版本、操作系统、访问时间、浏览的页面、引荐来源等。这些信息由我们的服务器（Cloudflare Pages）自动记录。
              </li>
              <li>
                <strong>Cookie 和类似技术：</strong>我们使用 Cookie 来提升您的浏览体验，包括记住您的偏好设置（如暗色/亮色模式）。
              </li>
            </ul>

            <h3>1.2 分析工具（Google Analytics）</h3>
            <p>
              本网站使用 Google Analytics 来分析网站流量和用户行为，以帮助我们改善网站内容和用户体验。Google Analytics 通过 Cookie 收集匿名的使用数据，包括但不限于：
            </p>
            <ul>
              <li>您访问了哪些页面以及停留时间</li>
              <li>您的大致地理位置（基于 IP 地址，不会精确到个人）</li>
              <li>您的设备和浏览器信息</li>
              <li>您是如何到达本网站的（搜索引擎、外部链接等）</li>
            </ul>
            <p>
              Google Analytics 的数据处理受 Google 隐私政策约束。您可以通过安装{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics 停用浏览器插件
              </a>{' '}
              来选择退出 Google Analytics 的数据收集。
            </p>

            <h3>1.3 我们不主动收集的信息</h3>
            <p>
              本网站是一个静态内容网站，<strong>不要求</strong>用户注册、登录或提交任何个人信息。我们不会主动收集您的姓名、电子邮件地址、电话号码或其他个人身份信息，除非您主动通过联系方式与我们取得联系。
            </p>

            <h2>2. Cookie 使用说明</h2>
            <p>本网站使用以下类型的 Cookie：</p>

            <h3>2.1 必要 Cookie</h3>
            <ul>
              <li>
                <strong>主题偏好 Cookie：</strong>用于记住您选择的亮色/暗色显示模式，以提供更好的浏览体验。
              </li>
            </ul>

            <h3>2.2 分析 Cookie</h3>
            <ul>
              <li>
                <strong>Google Analytics Cookie（_ga、_gid 等）：</strong>用于收集匿名的网站使用统计数据，帮助我们了解网站的访问情况并进行改进。
              </li>
            </ul>

            <h3>2.3 管理 Cookie</h3>
            <p>
              您可以通过浏览器设置来管理或删除 Cookie。请注意，禁用某些 Cookie 可能会影响您在本网站上的浏览体验。首次访问时，网站会显示 Cookie 通知横幅，您可以选择接受或拒绝非必要 Cookie。
            </p>

            <h2>3. 信息的使用</h2>
            <p>我们收集的信息仅用于以下目的：</p>
            <ul>
              <li>维护和改善网站的功能与内容</li>
              <li>分析网站的访问趋势和用户偏好</li>
              <li>确保网站的安全性和性能</li>
              <li>回复您通过联系方式发送的咨询</li>
            </ul>

            <h2>4. 信息的共享与披露</h2>
            <p>
              我们<strong>不会</strong>出售、交易或以其他方式向外部方转让您的个人信息。以下情况除外：
            </p>
            <ul>
              <li>为遵守法律法规的要求</li>
              <li>为保护本网站和用户的合法权益</li>
              <li>
                我们的服务提供商（如 Cloudflare、Google）在提供服务过程中可能会按照其各自的隐私政策处理相关数据
              </li>
            </ul>

            <h2>5. 数据安全</h2>
            <p>
              本网站通过 HTTPS 加密传输，并托管在 Cloudflare Pages 上，享有 Cloudflare 提供的安全防护。我们采取合理的技术和管理措施来保护收集到的信息安全，但请注意，互联网上的数据传输和存储不可能做到 100% 安全。
            </p>

            <h2>6. 第三方链接</h2>
            <p>
              本网站可能包含指向第三方网站的链接。我们对这些网站的隐私政策和内容不承担责任。我们建议您在访问任何第三方网站前阅读其隐私政策。
            </p>

            <h2>7. 您的权利（GDPR 合规）</h2>
            <p>
              如果您是欧盟/欧洲经济区的用户，根据《通用数据保护条例》（GDPR），您享有以下权利：
            </p>
            <ul>
              <li>
                <strong>知情权：</strong>了解我们收集和处理您数据的方式
              </li>
              <li>
                <strong>访问权：</strong>请求获取我们持有的关于您的数据的副本
              </li>
              <li>
                <strong>更正权：</strong>请求更正不准确的个人数据
              </li>
              <li>
                <strong>删除权：</strong>在特定情况下请求删除您的个人数据
              </li>
              <li>
                <strong>限制处理权：</strong>请求限制对您个人数据的处理
              </li>
              <li>
                <strong>数据可携带权：</strong>请求以结构化、通用且机器可读的格式接收您的个人数据
              </li>
              <li>
                <strong>反对权：</strong>反对我们基于合法利益对您个人数据的处理
              </li>
              <li>
                <strong>撤回同意权：</strong>您可以随时撤回对 Cookie 使用的同意
              </li>
            </ul>
            <p>
              如需行使以上任何权利，请通过电子邮件联系我们：
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>

            <h2>8. 儿童隐私</h2>
            <p>
              本网站不面向 16 岁以下的儿童。我们不会故意收集 16 岁以下儿童的个人信息。如果您是家长或监护人，并且发现您的孩子向我们提供了个人信息，请与我们联系，我们将采取措施删除该信息。
            </p>

            <h2>9. 隐私政策的更新</h2>
            <p>
              我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并更新"最后更新"日期。我们建议您定期查看本政策以了解任何变更。
            </p>

            <h2>10. 联系我们</h2>
            <p>如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：</p>
            <ul>
              <li>
                电子邮件：
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li>
                网站：
                <a href={SITE_URL}>{SITE_URL}</a>
              </li>
            </ul>

            <p className="mt-8 text-sm text-muted-foreground">
              © 1997-{currentYear} 刘虎. 保留所有权利。
            </p>
          </div>
        </article>
      </div>
    </>
  )
}
