'use client'

import { useEffect } from 'react'
import { ADSENSE_CLIENT_ID, ADSENSE_SLOTS, isAdSlotEnabled } from '@/lib/adsense'

export function DisplayAd() {
	const slot = ADSENSE_SLOTS.display
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
		<div className="my-8 mx-auto max-w-3xl">
			<div className="mb-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
				广告
			</div>
			<ins
				className="adsbygoogle"
				style={{ display: 'block' }}
				data-ad-client={ADSENSE_CLIENT_ID}
				data-ad-slot={slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</div>
	)
}
