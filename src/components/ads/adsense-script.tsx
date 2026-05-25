import Script from 'next/script'
import { ADSENSE_CLIENT_ID } from '@/lib/adsense'

export function AdsenseScript() {
	if (!ADSENSE_CLIENT_ID) return null
	if (process.env.NODE_ENV !== 'production') return null

	return (
		<Script
			id="adsense-loader"
			async
			src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
			crossOrigin="anonymous"
			strategy="afterInteractive"
		/>
	)
}
