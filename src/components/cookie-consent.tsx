'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Cookie, Shield } from 'lucide-react'

type ConsentStatus = 'all' | 'necessary' | null

export function CookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus | 'pending'>('pending')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as ConsentStatus
    if (stored) {
      setConsentStatus(stored)
      setIsVisible(false)
    } else {
      setConsentStatus(null)
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setConsentStatus('all')
    setIsVisible(false)
    window.dispatchEvent(new CustomEvent('cookie-consent-change'))
  }

  const handleNecessaryOnly = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setConsentStatus('necessary')
    setIsVisible(false)
    window.dispatchEvent(new CustomEvent('cookie-consent-change'))
  }

  if (consentStatus === 'pending' || consentStatus === 'all' || consentStatus === 'necessary') {
    return null
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie 使用同意"
    >
      <div className="border-t border-border bg-background/95 backdrop-blur-md shadow-2xl">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Info section */}
            <div className="flex items-start gap-3 sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-tight text-foreground">
                  本站使用 Cookie 来提升您的浏览体验
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  我们使用必要的 Cookie 来保证网站正常运行，并使用分析类 Cookie（Google Analytics）
                  来了解访问情况以改进内容。点击"接受所有"即表示您同意我们使用所有 Cookie。
                  您也可以选择"仅必要"来拒绝分析类 Cookie。
                  详情请参阅我们的{' '}
                  <a
                    href="/privacy"
                    className="underline underline-offset-2 transition-colors hover:text-foreground"
                  >
                    隐私政策
                  </a>
                  。
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNecessaryOnly}
                className="gap-1.5 text-xs sm:text-sm"
              >
                <Shield className="h-3.5 w-3.5" />
                仅必要
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="gap-1.5 bg-blue-600 text-xs text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:text-sm"
              >
                <Cookie className="h-3.5 w-3.5" />
                接受所有
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
