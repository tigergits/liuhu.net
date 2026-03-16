import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, type CategoryCode } from "@/lib/types";
import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

const POSTS_PER_PAGE = 20;

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  essay: "随笔记录，关于生活、工作、思考的点滴感悟。一个程序员的内心独白。",
  mystory: "我的故事，记录从一个农村少年到资深程序员的成长历程。",
  daily: "日记本，记录日常生活中的喜怒哀乐与工作感悟。",
  trip: "游记，用脚步丈量世界，用文字记录旅途中的风景与感动。",
  lhwz: "技术文摘，收集整理有价值的技术文章与编程心得。",
  about: "关于我，了解程序员刘虎的更多信息。",
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = Object.keys(CATEGORIES).filter(
    (category) => category !== "about",
  );
  if (process.env.NODE_ENV === "development") {
    // dev: 同时支持带/不带 .htm，便于本地直接访问两种 URL
    return [
      ...categories.map((category) => ({ category })),
      ...categories.map((category) => ({ category: `${category}.htm` })),
    ];
  }
  // 生产：只生成 .htm 参数 → 输出 mystory.htm.html，构建后脚本改名为 mystory.htm
  return categories.map((category) => ({ category: `${category}.htm` }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: rawCategory } = await params;
  const category = rawCategory.replace(/\.htm$/, "");
  const cat = CATEGORIES[category as keyof typeof CATEGORIES];
  if (!cat) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.liuhu.net";
  const canonicalUrl = `${siteUrl}${cat.htmPath}`;
  const title = `${cat.name} - 程序员刘虎的故事`;
  const description =
    CATEGORY_DESCRIPTIONS[category] || `${cat.name} - 程序员刘虎的故事`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "程序员刘虎的故事",
      type: "website",
      locale: "zh_CN",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category: rawCategory } = await params;
  const category = rawCategory.replace(/\.htm$/, "");

  const cat = CATEGORIES[category as keyof typeof CATEGORIES];
  if (!cat) {
    notFound();
  }

  const allPosts = getPostsByCategory(category as CategoryCode);
  const currentPage = 1;
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.liuhu.net";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cat.name,
        item: `${siteUrl}/${category}.htm`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.name,
    description: CATEGORY_DESCRIPTIONS[category],
    numberOfItems: allPosts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: startIndex + index + 1,
      url: post.canonical,
      name: post.title,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <div className="container-content py-8">
        <Breadcrumb
          items={[{ label: "首页", href: "/" }, { label: cat.name }]}
        />

        <div className="mt-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {cat.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            共{" "}
            <span className="font-semibold text-foreground">
              {allPosts.length}
            </span>{" "}
            篇文章
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">暂无文章</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className="mt-12 flex items-center justify-center gap-2"
            aria-label="分页导航"
          >
            {validPage > 1 && (
              <Link
                href={`/${category}.htm${validPage - 1 === 1 ? "" : `?page=${validPage - 1}`}`}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                上一页
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                totalPages <= 7 ||
                page === 1 ||
                page === totalPages ||
                Math.abs(page - validPage) <= 1
              ) {
                return (
                  <Link
                    key={page}
                    href={`/${category}.htm${page === 1 ? "" : `?page=${page}`}`}
                    className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-md border transition-colors ${
                      page === validPage
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border bg-background hover:bg-accent"
                    }`}
                    aria-current={page === validPage ? "page" : undefined}
                  >
                    {page}
                  </Link>
                );
              }
              if (
                (page === 2 && validPage > 4) ||
                (page === totalPages - 1 && validPage < totalPages - 3)
              ) {
                return (
                  <span
                    key={page}
                    className="inline-flex items-center justify-center w-10 h-10 text-sm text-muted-foreground"
                  >
                    …
                  </span>
                );
              }
              return null;
            })}

            {validPage < totalPages && (
              <Link
                href={`/${category}.htm?page=${validPage + 1}`}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
              >
                下一页
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
