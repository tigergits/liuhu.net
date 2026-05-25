'use client'

import { useEffect } from 'react'
import { ADSENSE_CLIENT_ID, ADSENSE_SLOTS, isAdSlotEnabled } from '@/lib/adsense'

declare global {
	interface Window {
		adsbygoogle: Array<Record<string, unknown>>
	}
}

export function SidebarAd() {
	const slot = ADSENSE_SLOTS.sidebar
	const enabled = isAdSlotEnabled(slot)

	useEffect(() => {
		if (!enabled) return
		try {
			window.adsbygoogle = window.adsbygoogle || []
			window.adsbygoogle.push({})
		} catch {
			/* noop */
		}
	}, [enabled])

	if (!enabled) return null

	return (
		<div className="rounded-lg border border-border bg-card p-3">
			<div className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
				广告
			</div>
			<ins
				className="adsbygoogle"
				style={{ display: 'block', minHeight: 250 }}
				data-ad-client={ADSENSE_CLIENT_ID}
				data-ad-slot={slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</div>
	)
}
