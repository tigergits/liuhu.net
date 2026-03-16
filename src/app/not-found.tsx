import Link from 'next/link'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <div className="text-[10rem] font-black leading-none text-muted-foreground/10 select-none">
          404
        </div>
        <FileQuestion
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
          size={72}
          strokeWidth={1.5}
        />
      </div>

      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
        页面未找到
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground leading-relaxed">
        抱歉，您访问的页面不存在或已被移动。
        <br />
        也许这个页面已经在时间的长河中消逝了。
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            返回首页
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/essay.htm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            浏览文章
          </Link>
        </Button>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
        <p>
          如果您认为这是一个错误，请{' '}
          <Link
            href="/contact"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            联系我
          </Link>
          ，我会尽快修复。
        </p>
      </div>
    </div>
  )
}
