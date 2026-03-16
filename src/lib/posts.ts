import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface Comment {
  title: string;
  author: string;
  date: string;
  content: string;
}

export interface Post {
  title: string;
  description: string;
  slug: string;
  canonical: string;
  date: string;
  content: string;
  rawContent: string;
  category: string;
  categoryName: string;
  comments?: Comment[];
}

export const CATEGORIES = {
  essay: { name: "随笔", htmPath: "/essay.htm", path: "/essay.htm" },
  mystory: { name: "我的故事", htmPath: "/mystory.htm", path: "/mystory.htm" },
  daily: { name: "我的日记", htmPath: "/daily.htm", path: "/daily.htm" },
  trip: { name: "我的游记", htmPath: "/trip.htm", path: "/trip.htm" },
  lhwz: { name: "技术文摘", htmPath: "/lhwz.htm", path: "/lhwz.htm" },
  about: { name: "关于", htmPath: "/about.htm", path: "/about.htm" },
} as const;

export type CategoryCode = keyof typeof CATEGORIES;

const contentDir = path.join(process.cwd(), "content");
console.log("contentDir", contentDir);

function parseComments(rawContent: string): {
  bodyContent: string;
  comments: Comment[];
} {
  const commentSectionMatch = rawContent.match(
    /## 留言\s*\n\s*(\[[\s\S]*\])\s*$/,
  );
  if (!commentSectionMatch) {
    return { bodyContent: rawContent, comments: [] };
  }

  const bodyContent = rawContent.slice(0, commentSectionMatch.index).trim();
  try {
    const comments = JSON.parse(commentSectionMatch[1]) as Comment[];
    return { bodyContent, comments };
  } catch {
    return { bodyContent: rawContent, comments: [] };
  }
}

export function getPostSlugs(category: CategoryCode): string[] {
  const categoryDir = path.join(contentDir, category);
  if (!fs.existsSync(categoryDir)) {
    return [];
  }
  return fs
    .readdirSync(categoryDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(
  category: CategoryCode,
  slug: string,
): Post | null {
  const filePath = path.join(contentDir, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(fileContent);
  const { bodyContent, comments } = parseComments(rawContent);

  // Synchronous HTML conversion using remark
  let htmlContent = "";
  try {
    const result = remark()
      .use(html, { sanitize: false })
      .processSync(bodyContent);
    htmlContent = result.toString();
  } catch {
    htmlContent = bodyContent;
  }

  const categoryInfo = CATEGORIES[category];

  return {
    title: data.title || slug,
    description: data.description || data.title || slug,
    slug,
    canonical:
      data.canonical || `https://www.liuhu.net/${category}/${slug}.htm`,
    date: data.date ? (data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)) : "2000-01-01",
    content: htmlContent,
    rawContent,
    category,
    categoryName: categoryInfo.name,
    comments: comments.length > 0 ? comments : undefined,
  };
}

export function getPostsByCategory(category: CategoryCode): Post[] {
  const slugs = getPostSlugs(category);
  const posts = slugs
    .map((slug) => getPostBySlug(category, slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });
  return posts;
}

export function getAllPosts(): Post[] {
  const allPosts: Post[] = [];
  for (const category of Object.keys(CATEGORIES) as CategoryCode[]) {
    allPosts.push(...getPostsByCategory(category));
  }
  return allPosts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getRelatedPosts(currentPost: Post, limit: number = 5): Post[] {
  const sameCategoryPosts = getPostsByCategory(
    currentPost.category as CategoryCode,
  ).filter((p) => p.slug !== currentPost.slug);

  if (sameCategoryPosts.length <= limit) {
    return sameCategoryPosts;
  }

  // Find posts closest in date
  const currentDate = new Date(currentPost.date).getTime();
  return sameCategoryPosts
    .sort((a, b) => {
      const diffA = Math.abs(new Date(a.date).getTime() - currentDate);
      const diffB = Math.abs(new Date(b.date).getTime() - currentDate);
      return diffA - diffB;
    })
    .slice(0, limit);
}
