import { readFileSync } from 'fs'

const src = readFileSync('src/data/movies.js', 'utf8')
const paths = [...src.matchAll(/p\('([^']+)'\)/g)].map((m) => m[1])
const uniq = [...new Set(paths)]

const results = await Promise.all(
  uniq.map(async (path) => {
    const url = `https://image.tmdb.org/t/p/w500${path}`
    try {
      const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000) })
      return { path, ok: res.ok, status: res.status }
    } catch (e) {
      return { path, ok: false, status: 'err' }
    }
  }),
)

const bad = results.filter((r) => !r.ok)
console.log('Broken:', bad.length)
bad.forEach((r) => console.log(r.status, r.path))
console.log('OK:', results.length - bad.length)
