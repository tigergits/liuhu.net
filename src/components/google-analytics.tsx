'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent')
      setConsentGiven(consent === 'all')
    }

    checkConsent()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        setConsentGiven(e.newValue === 'all')
      }
    }

    const handleConsentChange = () => {
      checkConsent()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cookie-consent-change', handleConsentChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cookie-consent-change', handleConsentChange)
    }
  }, [])

  if (!GA_ID || !consentGiven) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  )
}

export function trackPageView(url: string) {
  const consent = localStorage.getItem('cookie-consent')
  if (consent !== 'all' || !GA_ID) return

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_ID, {
      page_path: url,
    })
  }
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}
