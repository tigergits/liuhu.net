import { CATEGORIES, type Category, type CategoryCode } from '@/types'

/**
 * Get category metadata by code
 */
export function getCategoryByCode(code: string): Category | null {
  const cat = CATEGORIES[code as CategoryCode]
  if (!cat) return null
  return { code, ...cat }
}

/**
 * Get all category objects as an array
 */
export function getAllCategoryList(): Category[] {
  return Object.entries(CATEGORIES).map(([code, cat]) => ({
    code,
    ...cat,
  }))
}

/**
 * Check if a given string is a valid category code
 */
export function isValidCategory(code: string): code is CategoryCode {
  return code in CATEGORIES
}

/**
 * Get category code from a URL path segment.
 * Handles special cases:
 * - /others/ -> trip
 * - /mystory/ -> could be mystory or about (need slug check)
 */
export function getCategoryFromPath(pathSegment: string): string | null {
  // Direct match
  if (pathSegment in CATEGORIES) {
    return pathSegment
  }

  // Special mappings
  const pathMap: Record<string, string> = {
    others: 'trip',
  }

  return pathMap[pathSegment] || null
}

/**
 * Get the display name for a category
 */
export function getCategoryName(code: string): string {
  const cat = CATEGORIES[code as CategoryCode]
  return cat?.name || code
}

/**
 * Get the URL path for a category listing page
 */
export function getCategoryPath(code: string): string {
  const cat = CATEGORIES[code as CategoryCode]
  return cat?.path || `/${code}`
}

/**
 * Map from the original .htm URL path segments to internal category codes
 */
export const PATH_TO_CATEGORY: Record<string, string> = {
  essay: 'essay',
  mystory: 'mystory',
  daily: 'daily',
  others: 'trip',
  lhwz: 'lhwz',
  about: 'about',
}

/**
 * Map from internal category codes to URL path segments used in routing
 */
export const CATEGORY_TO_PATH: Record<string, string> = {
  essay: 'essay',
  mystory: 'mystory',
  daily: 'daily',
  trip: 'others',
  lhwz: 'lhwz',
  about: 'mystory',
}

/**
 * Get the route segment for Next.js app router based on category
 */
export function getRouteSegment(categoryCode: string): string {
  return CATEGORY_TO_PATH[categoryCode] || categoryCode
}

/**
 * Get category icon name (for UI display)
 */
export function getCategoryIcon(code: string): string {
  const iconMap: Record<string, string> = {
    essay: 'pen-line',
    mystory: 'book-open',
    daily: 'calendar',
    trip: 'map-pin',
    lhwz: 'code',
    about: 'user',
  }
  return iconMap[code] || 'file-text'
}

/**
 * Get category description for SEO
 */
export function getCategoryDescription(code: string): string {
  const descMap: Record<string, string> = {
    essay: '程序员刘虎的随笔文章，记录工作与生活中的所思所想。',
    mystory: '程序员刘虎的个人故事，从中专到全栈工程师的成长历程。',
    daily: '程序员刘虎的日记，记录日常工作和生活的点滴。',
    trip: '程序员刘虎的游记，记录旅途中的风景与感悟。',
    lhwz: '程序员刘虎收集整理的技术文摘，涵盖编程开发的各个方面。',
    about: '关于程序员刘虎，一个25+年开发经验的全栈工程师。',
  }
  return descMap[code] || '程序员刘虎的个人网站文章。'
}
