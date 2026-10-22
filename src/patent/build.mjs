// 把 PatentPlan.vue / PatentReport.vue 轉成教學網站的靜態頁（GitHub Pages 無法直接執行 Vue）。
// 用法：cd src/patent && npm install && npm run build
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { parse, compileScript, compileStyle } from 'vue/compiler-sfc'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import postcss from 'postcss'

const here = dirname(fileURLToPath(import.meta.url))
const site = join(here, '..', '..')

const PAGES = [
  { vue: 'PatentPlan.vue', out: 'patent-plan.html', title: '專利分析 AI 協作系統：規劃書', other: ['patent-report.html', '看示範報告 →'] },
  { vue: 'PatentReport.vue', out: 'patent-report.html', title: '板式熱交換器與熱管理領域專利分析報告（示範）', other: ['patent-plan.html', '← 看規劃書'] },
]

// 原站全域樣式（含 :root 變數）只套用在 .kbv 容器內，避免和教學網站的 .card、--surface 等衝突
const scopeBase = css => postcss([{
  postcssPlugin: 'kbv-scope',
  Rule(rule) {
    if (rule.parent.type === 'atrule' && /keyframes/.test(rule.parent.name)) return
    if (rule.selector.startsWith('.kbv')) return
    rule.selectors = rule.selectors.map(s => {
      s = s.trim()
      if (/^(:root|html|body|#app)$/.test(s)) return '.kbv'
      if (s.startsWith('::-webkit-scrollbar')) return '.kbv ' + s
      return '.kbv ' + s
    })
  },
}]).process(css, { from: undefined }).css

const WRAP = `
.kbv{min-height:70vh;padding:110px 0 24px}
@media (max-width:700px){.kbv{padding-top:76px}}
.kbv .kbv-bar{width:100%;max-width:880px;margin:0 auto;padding:16px 24px 0;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;font-size:14px}
.kbv .kbv-bar a{color:var(--accent);text-decoration:underline}
.kbv .kbv-gen{width:100%;max-width:880px;margin:0 auto;padding:0 24px;font-size:12px;color:var(--text-faint)}
`

async function build({ vue, out, title, other }) {
  const filename = join(here, vue)
  const source = readFileSync(filename, 'utf8')
  const { descriptor, errors } = parse(source, { filename })
  if (errors.length) throw errors[0]
  const id = createHash('sha256').update(vue).digest('hex').slice(0, 8)
  const scopeId = `data-v-${id}`
  const script = compileScript(descriptor, {
    id, inlineTemplate: true,
    templateOptions: { ssr: true, scoped: true, compilerOptions: { comments: false, scopeId } },
  })
  const tmp = join(here, `.tmp-${id}.mjs`)
  writeFileSync(tmp, script.content)
  let comp
  try { comp = (await import(pathToFileURL(tmp).href + '?t=' + Date.now())).default } finally { rmSync(tmp) }
  comp.__scopeId = scopeId
  const body = (await renderToString(createSSRApp(comp))).replace(/<!--[\s\S]*?-->/g, '')
  const css = descriptor.styles.map(s => {
    const r = compileStyle({ source: s.content, filename, id: scopeId, scoped: s.scoped })
    if (r.errors.length) throw r.errors[0]
    return r.code
  }).join('\n')
  // 與教學網站 assets/style.css 同名的 class 自動加上 kbv- 前綴，避免網站樣式滲入
  const siteCls = new Set([...readFileSync(join(site, 'assets', 'style.css'), 'utf8').matchAll(/\.([a-zA-Z][\w-]*)/g)].map(m => m[1]))
  const clash = new Set()
  const html0 = body.replace(/class="([^"]*)"/g, (_, c) => `class="${c.split(/\s+/).map(k => siteCls.has(k) ? (clash.add(k), 'kbv-' + k) : k).join(' ')}"`)
  const ren = s => clash.size ? s.replace(new RegExp(`\\.(${[...clash].join('|')})(?![\\w-])`, 'g'), '.kbv-$1') : s
  const base = ren(scopeBase(readFileSync(join(here, 'kb-base.css'), 'utf8')))
  const bar = `<p class="kbv-bar"><a href="kb-project-analysis.html">← 回到課程〈知識庫應用：專案分析〉</a><a href="${other[0]}">${other[1]}</a></p>`
  const html = `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <script src="assets/site.js"></script><link rel="stylesheet" href="assets/style.css">
  <style>
${base}
${ren(css)}
${WRAP}
  </style>
</head>
<body>
  <div class="kbv">
    ${bar}
    ${html0}
    ${bar}
    <p class="kbv-gen">本頁由 Vue 原始碼產生（src/patent/${vue}），請勿直接修改本檔；改原始碼後執行 npm run build。</p>
  </div>
  <script src="assets/nav.js"></script>
</body>
</html>
`
  writeFileSync(join(site, out), html)
  console.log('built', out, html.length, 'renamed:', [...clash].join(' ') || '-')
}

for (const p of PAGES) await build(p)
