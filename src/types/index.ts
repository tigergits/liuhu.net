export interface Comment {
  title: string
  author: string
  date: string
  content: string
}

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
  comments: Comment[]
}

export interface Category {
  code: string
  name: string
  htmPath: string
  path: string
}

export const CATEGORIES: Record<string, Omit<Category, 'code'>> = {
  essay: { name: '随笔', htmPath: '/essay.htm', path: '/essay' },
  mystory: { name: '我的故事', htmPath: '/mystory.htm', path: '/mystory' },
  daily: { name: '我的日记', htmPath: '/daily.htm', path: '/daily' },
  trip: { name: '我的游记', htmPath: '/trip.htm', path: '/trip' },
  lhwz: { name: '技术文摘', htmPath: '/lhwz.htm', path: '/lhwz' },
  about: { name: '关于', htmPath: '/about.htm', path: '/about' },
} as const

export type CategoryCode = keyof typeof CATEGORIES

export function getCategoryByCode(code: string): Category | null {
  const cat = CATEGORIES[code]
  if (!cat) return null
  return { code, ...cat }
}

export function getAllCategoryList(): Category[] {
  return Object.entries(CATEGORIES).map(([code, cat]) => ({
    code,
    ...cat,
  }))
}
