export const ADSENSE_CLIENT_ID =
	process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || ''

export const ADSENSE_SLOTS = {
	sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
	inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || '',
	display: process.env.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY || '',
} as const

export function isAdSlotEnabled(slot: string): boolean {
	if (!ADSENSE_CLIENT_ID || !slot) return false
	if (process.env.NODE_ENV !== 'production') return false
	return true
}
