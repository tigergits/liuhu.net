export interface Post {
  title: string
  description: string
  slug: string
  canonical: string
  date: string
  content: string
  rawContent: string
  category: string
  categoryName: string
  comments?: Comment[]
}

export interface Comment {
  title: string
  author: string
  date: string
  content: string
}

export const CATEGORIES = {
  essay: { name: "随笔", htmPath: "/essay.htm", path: "/essay.htm" },
  mystory: { name: "我的故事", htmPath: "/mystory.htm", path: "/mystory.htm" },
  daily: { name: "我的日记", htmPath: "/daily.htm", path: "/daily.htm" },
  trip: { name: "我的游记", htmPath: "/trip.htm", path: "/trip.htm" },
  lhwz: { name: "技术文摘", htmPath: "/lhwz.htm", path: "/lhwz.htm" },
  about: { name: "关于", htmPath: "/about.htm", path: "/about.htm" },
} as const

export type CategoryCode = keyof typeof CATEGORIES
