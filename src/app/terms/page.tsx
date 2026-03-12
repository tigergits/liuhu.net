import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liuhu.net'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'liuhu@liuhu.net'

export const metadata: Metadata = {
  title: '服务条款 - 程序员刘虎的故事',
  description: '程序员刘虎的故事网站服务条款，了解使用本网站的条件和规定。',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: '服务条款 - 程序员刘虎的故事',
    description: '了解使用本网站的条件和规定。',
    url: `${SITE_URL}/terms`,
    siteName: '程序员刘虎的故事',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function TermsPage() {
  const currentYear = new Date().getFullYear()
  const lastUpdated = '2024-01-01'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '服务条款',
    description: '程序员刘虎的故事网站服务条款',
    url: `${SITE_URL}/terms`,
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
                <li className="text-foreground font-medium">服务条款</li>
              </ol>
            </nav>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              服务条款
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
              欢迎访问「程序员刘虎的故事」（以下简称"本网站"，网址：{SITE_URL}）。在您使用本网站之前，请仔细阅读以下服务条款（以下简称"本条款"）。访问或使用本网站即表示您同意受本条款的约束。
            </p>

            <h2>1. 网站概述</h2>
            <p>
              本网站是由刘虎个人创建和维护的个人博客网站，始建于 1997 年，主要记录个人的技术心得、生活随笔、旅行游记及相关故事。本网站所有内容仅代表作者个人观点。
            </p>

            <h2>2. 知识产权</h2>

            <h3>2.1 版权声明</h3>
            <p>
              本网站上发布的所有原创内容，包括但不限于文字、图片、代码示例、页面设计和排版，其著作权归刘虎所有。
            </p>
            <p className="font-semibold">
              © 1997-{currentYear} 刘虎. 保留所有权利。
            </p>

            <h3>2.2 内容使用</h3>
            <ul>
              <li>
                <strong>个人学习：</strong>您可以为个人学习目的浏览、阅读和引用本网站内容。
              </li>
              <li>
                <strong>转载与引用：</strong>如需转载本网站文章，请注明出处（包括作者姓名"刘虎"和原文链接），并在合理范围内引用，不得歪曲原意。
              </li>
              <li>
                <strong>禁止行为：</strong>未经书面许可，不得将本网站内容用于商业目的，不得大规模复制、分发或以任何方式暗示与本网站的关联。
              </li>
            </ul>

            <h3>2.3 用户留言</h3>
            <p>
              本网站展示的历史留言内容版权归原留言者所有。本网站仅作为历史记录的展示平台。如果您是原留言者并希望删除您的留言，请与我们联系。
            </p>

            <h2>3. 免责声明</h2>

            <h3>3.1 内容准确性</h3>
            <p>
              本网站内容基于作者的个人经历和知识编写，可能包含主观观点或不准确之处。本网站上的技术文章仅供参考，部分早期文章中的技术信息可能已过时。我们不保证内容的完整性、准确性或时效性。
            </p>

            <h3>3.2 使用风险</h3>
            <p>
              您对本网站的使用完全基于您自己的判断和风险承担。对于因使用本网站内容（包括但不限于代码示例、技术建议）而导致的任何直接或间接损失，本网站不承担任何责任。
            </p>

            <h3>3.3 第三方链接</h3>
            <p>
              本网站可能包含指向第三方网站的链接。这些链接仅为方便您而提供。我们不对第三方网站的内容、隐私政策或服务负责，访问第三方网站的风险由您自行承担。
            </p>

            <h3>3.4 服务可用性</h3>
            <p>
              本网站作为个人项目运营，我们不保证网站的持续可用性。网站可能因维护、升级或其他原因暂时不可访问。
            </p>

            <h2>4. 用户行为规范</h2>
            <p>在使用本网站时，您同意不会：</p>
            <ul>
              <li>试图未经授权访问本网站的任何部分、系统或网络</li>
              <li>使用自动化工具大量抓取本网站内容</li>
              <li>进行任何可能损害本网站性能或安全的行为</li>
              <li>复制、修改本网站的设计和代码用于商业目的</li>
              <li>冒充本网站或网站作者进行任何活动</li>
            </ul>

            <h2>5. 隐私保护</h2>
            <p>
              您在使用本网站时的隐私受到我们的重视。有关我们如何收集、使用和保护您的信息，请参阅我们的{' '}
              <a href="/privacy">隐私政策</a>。
            </p>

            <h2>6. Cookie 使用</h2>
            <p>
              本网站使用 Cookie 来改善您的浏览体验和收集匿名访问统计数据。首次访问时，您可以选择是否接受非必要 Cookie。更多详情请参阅我们的{' '}
              <a href="/privacy">隐私政策</a>。
            </p>

            <h2>7. 条款变更</h2>
            <p>
              我们保留随时修改或更新本条款的权利。修改后的条款将在本页面发布，并更新"最后更新"日期。您在条款修改后继续使用本网站即表示接受修改后的条款。我们建议您定期查看本条款。
            </p>

            <h2>8. 适用法律</h2>
            <p>
              本条款受中华人民共和国法律管辖。如因本条款引起任何争议，双方应首先通过友好协商解决。协商不成的，任何一方均可向有管辖权的人民法院提起诉讼。
            </p>

            <h2>9. 可分割性</h2>
            <p>
              如果本条款的任何条款被认定为无效或不可执行，该条款将在必要的最小范围内被修改或删除，本条款的其余条款仍将保持完全有效。
            </p>

            <h2>10. 联系方式</h2>
            <p>
              如果您对本条款有任何疑问、意见或建议，请通过以下方式联系我们：
            </p>
            <ul>
              <li>
                电子邮件：
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li>
                网站：
                <a href={SITE_URL}>{SITE_URL}</a>
              </li>
              <li>
                联系页面：
                <a href="/contact">联系我</a>
              </li>
            </ul>

            <hr className="my-10" />

            <p className="text-center text-sm text-muted-foreground">
              感谢您访问「程序员刘虎的故事」！本网站自 1997 年上线至今，记录了一个程序员二十余年的成长历程。
              <br />
              希望这些文字能给您带来一些启发或共鸣。
            </p>
            <p className="text-center text-sm text-muted-foreground">
              © 1997-{currentYear} 刘虎. 保留所有权利。
            </p>
          </div>
        </article>
      </div>
    </>
  )
}
