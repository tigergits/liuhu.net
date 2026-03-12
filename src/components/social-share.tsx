"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Share2,
  Link2,
  Check,
  X,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SocialShareProps {
  url: string
  title: string
  description?: string
}

function WeiboIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM17.2 12.938c-.233-.084-.393-.14-.27-.505.267-.792.295-1.476-.003-1.963-.558-.91-2.089-.862-3.767-.024 0 0-.539.236-.402-.192.266-.84.226-1.545-.187-1.952-.937-.924-3.432.01-5.573 2.084C5.138 12.233 4 14.26 4 16.048c0 3.424 4.396 5.505 8.695 5.505 5.633 0 9.38-3.269 9.38-5.865.003-1.567-1.322-2.457-2.875-2.75zm3.627-6.066a4.853 4.853 0 0 0-4.874-1.408.752.752 0 0 0 .393 1.45 3.356 3.356 0 0 1 3.373.975 3.358 3.358 0 0 1 .768 3.455.752.752 0 1 0 1.407.528 4.852 4.852 0 0 0-1.067-5zm-1.896 2.322a2.47 2.47 0 0 0-2.482-.715.542.542 0 0 0 .283 1.047 1.39 1.39 0 0 1 1.395.548c.276.395.333.9.153 1.377a.543.543 0 0 0 1.015.392 2.48 2.48 0 0 0-.364-2.649z" />
    </svg>
  )
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.328.328 0 0 0 .186-.058l1.866-1.12a.9.9 0 0 1 .463-.128.986.986 0 0 1 .293.045 10.35 10.35 0 0 0 2.811.388h.003c-.004-.077-.019-.152-.019-.229 0-3.612 3.412-6.538 7.623-6.538.254 0 .503.02.75.036C16.24 6.073 12.861 2.188 8.691 2.188zm-2.6 4.94a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm5.198 0a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM24 16.221c0-3.236-3.291-5.862-7.347-5.862-4.054 0-7.345 2.626-7.345 5.862 0 3.238 3.291 5.865 7.345 5.865a9.05 9.05 0 0 0 2.332-.307.76.76 0 0 1 .227-.035.696.696 0 0 1 .36.1l1.455.874a.254.254 0 0 0 .145.046.23.23 0 0 0 .228-.228c0-.057-.023-.11-.038-.165l-.305-1.155a.46.46 0 0 1 .166-.519C23.003 19.783 24 18.105 24 16.221zm-9.712-1.025a.816.816 0 1 1 0-1.632.816.816 0 0 1 0 1.632zm4.73 0a.816.816 0 1 1 0-1.632.816.816 0 0 1 0 1.632z" />
    </svg>
  )
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [fullUrl, setFullUrl] = useState(url)

  useEffect(() => {
    if (url.startsWith("/")) {
      setFullUrl(`${window.location.origin}${url}`)
    } else if (!url.startsWith("http")) {
      setFullUrl(`${window.location.origin}/${url}`)
    } else {
      setFullUrl(url)
    }
  }, [url])

  const shareText = `${title}${description ? " - " + description : ""}`

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textArea = document.createElement("textarea")
      textArea.value = fullUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [fullUrl])

  const shareToWeibo = useCallback(() => {
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(
      fullUrl
    )}&title=${encodeURIComponent(shareText)}`
    window.open(weiboUrl, "_blank", "width=600,height=500")
  }, [fullUrl, shareText])

  const shareToTwitter = useCallback(() => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      fullUrl
    )}&text=${encodeURIComponent(shareText)}`
    window.open(twitterUrl, "_blank", "width=600,height=500")
  }, [fullUrl, shareText])

  const wechatQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    fullUrl
  )}`

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-1">
        <span className="mr-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Share2 className="h-3.5 w-3.5" />
          分享
        </span>

        {/* Weibo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground transition-colors hover:text-[#E6162D]"
              onClick={shareToWeibo}
              aria-label="分享到微博"
            >
              <WeiboIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>分享到微博</p>
          </TooltipContent>
        </Tooltip>

        {/* WeChat QR Code */}
        <div className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground transition-colors hover:text-[#07C160]"
                aria-label="微信分享"
                onClick={() => setShowQR(!showQR)}
              >
                <WechatIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>微信扫码分享</p>
            </TooltipContent>
          </Tooltip>
          {showQR && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-auto p-4 bg-background border rounded-md shadow-md z-50">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-between self-stretch">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <WechatIcon className="h-4 w-4 text-[#07C160]" />
                    微信扫码分享
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setShowQR(false)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="overflow-hidden rounded-lg border bg-white p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={wechatQRUrl}
                    alt="微信分享二维码"
                    width={180}
                    height={180}
                    className="block"
                  />
                </div>
                <p className="max-w-[200px] text-center text-xs text-muted-foreground">
                  打开微信扫一扫，将文章分享给朋友
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Twitter / X */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground"
              onClick={shareToTwitter}
              aria-label="分享到 X (Twitter)"
            >
              <TwitterXIcon className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>分享到 X (Twitter)</p>
          </TooltipContent>
        </Tooltip>

        {/* Copy Link */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 transition-colors ${
                copied
                  ? "text-green-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={handleCopyLink}
              aria-label="复制链接"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "已复制！" : "复制链接"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Native Share API (mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                onClick={() => {
                  navigator.share({
                    title,
                    text: description || title,
                    url: fullUrl,
                  })
                }}
                aria-label="更多分享方式"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>更多分享</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  )
}

export default SocialShare
