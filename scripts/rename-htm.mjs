/**
 * 构建后脚本：将 out/ 目录中所有 *.htm.html 改名为 *.htm
 *
 * 原因：
 *   Next.js output: export 只能生成 .html 后缀的文件。
 *   我们在 generateStaticParams() 中使用 "mystory.htm" 作为参数，
 *   Next.js 会生成 mystory.htm.html（以及 mystory.htm.txt RSC payload）。
 *   本脚本将 mystory.htm.html → mystory.htm，
 *   这样 Cloudflare Pages 就能直接以 /mystory.htm URL 提供文件，
 *   RSC payload 路径 /mystory.htm.txt 也保持正确，客户端路由正常工作。
 */

import { readdirSync, renameSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const outDir = resolve(__dirname, '../out')

let count = 0

function processDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      processDir(fullPath)
    } else if (entry.name.endsWith('.htm.html')) {
      // mystory.htm.html → mystory.htm（去掉末尾的 .html）
      const newPath = fullPath.slice(0, -'.html'.length)
      renameSync(fullPath, newPath)
      console.log(`  ✓ ${entry.name} → ${entry.name.slice(0, -'.html'.length)}`)
      count++
    }
  }
}

console.log(`\n开始重命名 out/ 目录中的 .htm.html 文件...\n`)
processDir(outDir)
console.log(`\n完成：共重命名 ${count} 个文件。\n`)
