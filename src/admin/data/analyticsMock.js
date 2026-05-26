import {
  lancamentos,
  populares,
  seriesEmAlta,
  featured,
} from '../../data/movies.js'

// ~600K visits/mo baseline — metrics scaled proportionally (Superflix-tier click depth)
const BASE_MONTHLY = {
  visits: 600_000,
  uniqueVisitors: 411_000,
  pageViews: 4_160_000,
  clicks: 12_850_000,
  avgSessionSec: 1171, // ~19m 31s
  bounceRate: 0.316,
  newUsersPct: 0.425,
  registrations: 9_600,
  bannerClicks: 158_000,
  trailerPlays: 724_000,
  searchQueries: 1_670_000,
}

function hashSeed(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function toDateStr(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function getPresetRange(preset) {
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (preset === 'this_month') {
    const start = new Date(end.getFullYear(), end.getMonth(), 1)
    return { preset, start, end, label: 'This month' }
  }
  if (preset === 'last_month') {
    const start = new Date(end.getFullYear(), end.getMonth() - 1, 1)
    const lastEnd = new Date(end.getFullYear(), end.getMonth(), 0)
    return { preset, start: start, end: lastEnd, label: 'Last month' }
  }
  if (preset === 'last_3_months') {
    const start = new Date(end.getFullYear(), end.getMonth() - 2, 1)
    return { preset, start, end, label: 'Last 3 months' }
  }
  return null
}

export function getCustomRange(startStr, endStr) {
  const start = new Date(startStr + 'T00:00:00')
  const end = new Date(endStr + 'T23:59:59')
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
    return null
  }
  return {
    preset: 'custom',
    start,
    end,
    label: `${startStr} → ${endStr}`,
  }
}

function daysInRange(range) {
  const ms = range.end - range.start
  return Math.max(1, Math.ceil(ms / 86400000) + 1)
}

function monthFactor(range) {
  const days = daysInRange(range)
  const refDays = 30
  return days / refDays
}

function scaleInt(base, factor, rand, variance = 0.06) {
  const jitter = 1 + (rand() - 0.5) * variance * 2
  return Math.round(base * factor * jitter)
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m >= 60) {
    const h = Math.floor(m / 60)
    const rm = m % 60
    return `${h}h ${rm}m`
  }
  return `${m}m ${s}s`
}

function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n)
}

function formatCompact(n) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n)
}

function pct(n) {
  return `${(n * 100).toFixed(1)}%`
}

const allTitles = [
  featured,
  ...lancamentos,
  ...populares,
  ...seriesEmAlta,
].filter((item, i, arr) => arr.findIndex((x) => x.slug === item.slug) === i)

const TOP_WEIGHTS = [
  1, 0.94, 0.88, 0.82, 0.76, 0.71, 0.66, 0.61, 0.57, 0.53,
  0.49, 0.46, 0.43, 0.4, 0.37, 0.34, 0.31, 0.28, 0.26, 0.24,
]

export function buildAnalytics(range) {
  const seedKey = `${range.preset}:${toDateStr(range.start)}:${toDateStr(range.end)}`
  const rand = mulberry32(hashSeed(seedKey))
  const factor = monthFactor(range)
  const isLongRange = range.preset === 'last_3_months' || daysInRange(range) > 45

  const visits = scaleInt(BASE_MONTHLY.visits, factor, rand)
  const uniqueVisitors = scaleInt(BASE_MONTHLY.uniqueVisitors, factor, rand)
  const pageViews = scaleInt(BASE_MONTHLY.pageViews, factor, rand)
  const clicks = scaleInt(BASE_MONTHLY.clicks, factor, rand)
  const registrations = scaleInt(BASE_MONTHLY.registrations, factor, rand)
  const bannerClicks = scaleInt(BASE_MONTHLY.bannerClicks, factor, rand)
  const trailerPlays = scaleInt(BASE_MONTHLY.trailerPlays, factor, rand)
  const searchQueries = scaleInt(BASE_MONTHLY.searchQueries, factor, rand)

  const avgSessionSec = Math.round(
    BASE_MONTHLY.avgSessionSec * (0.97 + rand() * 0.08),
  )
  const bounceRate = BASE_MONTHLY.bounceRate + (rand() - 0.5) * 0.04
  const pagesPerSession = pageViews / visits
  const clicksPerVisit = clicks / visits

  const devices = [
    { id: 'mobile', label: 'Mobile', pct: 0.61 + (rand() - 0.5) * 0.02 },
    { id: 'desktop', label: 'Desktop (Web)', pct: 0.27 + (rand() - 0.5) * 0.015 },
    { id: 'tablet', label: 'Tablet', pct: 0.12 + (rand() - 0.5) * 0.01 },
  ]
  const devSum = devices.reduce((s, d) => s + d.pct, 0)
  devices.forEach((d) => {
    d.share = d.pct / devSum
    d.visits = Math.round(visits * d.share)
    d.clicks = Math.round(clicks * d.share)
  })

  const countries = [
    { code: 'BR', label: 'Brazil', weight: 0.62 },
    { code: 'PT', label: 'Portugal', weight: 0.14 },
    { code: 'US', label: 'United States', weight: 0.11 },
    { code: 'AR', label: 'Argentina', weight: 0.04 },
    { code: 'MX', label: 'Mexico', weight: 0.03 },
    { code: 'GB', label: 'United Kingdom', weight: 0.025 },
    { code: 'DE', label: 'Germany', weight: 0.018 },
    { code: 'FR', label: 'France', weight: 0.015 },
    { code: 'CA', label: 'Canada', weight: 0.012 },
    { code: 'ES', label: 'Spain', weight: 0.01 },
    { code: 'IT', label: 'Italy', weight: 0.008 },
    { code: 'JP', label: 'Japan', weight: 0.006 },
  ]
  const cSum = countries.reduce((s, c) => s + c.weight, 0)
  countries.forEach((c) => {
    c.share = c.weight / cSum
    c.visits = Math.round(visits * c.share)
    c.pctLabel = pct(c.share)
  })

  const sources = [
    { label: 'Google (Organic)', key: 'google', weight: 0.34 },
    { label: 'Direct', key: 'direct', weight: 0.22 },
    { label: 'Instagram', key: 'instagram', weight: 0.12 },
    { label: 'TikTok', key: 'tiktok', weight: 0.09 },
    { label: 'Telegram', key: 'telegram', weight: 0.08 },
    { label: 'Facebook', key: 'facebook', weight: 0.05 },
    { label: 'Twitter / X', key: 'twitter', weight: 0.04 },
    { label: 'Referral sites', key: 'referral', weight: 0.04 },
    { label: 'Bing / Other search', key: 'bing', weight: 0.02 },
  ]
  const sSum = sources.reduce((s, x) => s + x.weight, 0)
  sources.forEach((s) => {
    s.share = s.weight / sSum
    s.visits = Math.round(visits * s.share)
    s.clicks = Math.round(clicks * s.share)
    s.pctLabel = pct(s.share)
  })

  const sortedTitles = [...allTitles].sort((a, b) => {
    const score = (item) =>
      (item.rating || 5) +
      (item.contentType === 'serie' ? 2.5 : 0) +
      hashSeed(item.slug + seedKey) * 0.000001
    return score(b) - score(a)
  })

  const topContent = sortedTitles.slice(0, 15).map((item, i) => {
    const w = TOP_WEIGHTS[i] ?? 0.2
    const itemClicks = Math.round(clicks * 0.028 * w * (0.85 + rand() * 0.3))
    const views = Math.round(itemClicks * (2.1 + rand() * 0.8))
    const avgWatchMin = Math.round(18 + rand() * 52 + (item.contentType === 'serie' ? 12 : 0))
    const completion = 0.42 + rand() * 0.38
    return {
      title: item.title,
      type: item.contentType === 'serie' ? 'Series' : 'Movie',
      slug: item.slug,
      clicks: itemClicks,
      views,
      avgWatchMin,
      completionPct: pct(completion),
    }
  })

  const contentTypeSplit = [
    {
      label: 'Movies',
      visits: Math.round(visits * 0.54),
      clicks: Math.round(clicks * 0.51),
      share: 0.54,
    },
    {
      label: 'Series',
      visits: Math.round(visits * 0.46),
      clicks: Math.round(clicks * 0.49),
      share: 0.46,
    },
  ]

  const searchTerms = [
    'la casa de papel',
    'round 6',
    'deadpool',
    'devoradores de estrelas',
    'wednesday',
    'duna 2',
    'moana 2',
    'the boys',
    'breaking bad',
    'gladiador',
  ].map((term, i) => ({
    term,
    count: Math.round(searchQueries * (0.14 - i * 0.01) * (0.9 + rand() * 0.2)),
  }))

  const dayCount = Math.min(daysInRange(range), isLongRange ? 90 : 31)
  const dailyTrend = []
  for (let i = 0; i < dayCount; i++) {
    const d = new Date(range.start)
    d.setDate(d.getDate() + i)
    if (d > range.end) break
    const weekend = d.getDay() === 0 || d.getDay() === 6
    const dayVisits = Math.round(
      (visits / dayCount) * (weekend ? 1.18 : 0.92) * (0.88 + rand() * 0.24),
    )
    dailyTrend.push({
      date: toDateStr(d),
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      visits: dayVisits,
      clicks: Math.round(dayVisits * clicksPerVisit),
      pageViews: Math.round(dayVisits * pagesPerSession),
    })
  }

  const hourly = Array.from({ length: 24 }, (_, h) => {
    const peak =
      h >= 19 && h <= 23 ? 1.35 : h >= 12 && h <= 14 ? 1.12 : h >= 2 && h <= 6 ? 0.45 : 0.85
    return {
      hour: `${pad(h)}:00`,
      visits: Math.round((visits / 24) * peak * (0.9 + rand() * 0.2)),
    }
  })

  const landingPages = [
    { path: '/', label: 'Home', views: Math.round(pageViews * 0.38) },
    { path: '/filmes', label: 'Movies catalog', views: Math.round(pageViews * 0.22) },
    { path: '/series', label: 'Series catalog', views: Math.round(pageViews * 0.19) },
    { path: '/descobrir', label: 'Discover', views: Math.round(pageViews * 0.11) },
    { path: '/content/*', label: 'Title pages', views: Math.round(pageViews * 0.1) },
  ]

  const prevFactor = factor * (range.preset === 'last_month' ? 1.08 : 0.94)
  const prevVisits = scaleInt(BASE_MONTHLY.visits, prevFactor, rand)

  return {
    range: {
      preset: range.preset,
      label: range.label,
      start: toDateStr(range.start),
      end: toDateStr(range.end),
      days: daysInRange(range),
    },
    summary: {
      visits,
      uniqueVisitors,
      pageViews,
      clicks,
      registrations,
      bannerClicks,
      trailerPlays,
      searchQueries,
      avgSession: formatDuration(avgSessionSec),
      avgSessionSec,
      bounceRate: pct(bounceRate),
      newUsersPct: pct(BASE_MONTHLY.newUsersPct + (rand() - 0.5) * 0.03),
      returningUsersPct: pct(1 - BASE_MONTHLY.newUsersPct),
      pagesPerSession: pagesPerSession.toFixed(1),
      clicksPerVisit: clicksPerVisit.toFixed(1),
      visitsChange: pct((visits - prevVisits) / prevVisits),
      clicksChange: pct((clicks - scaleInt(BASE_MONTHLY.clicks, prevFactor, rand)) / scaleInt(BASE_MONTHLY.clicks, prevFactor, rand)),
    },
    devices,
    countries,
    sources,
    topContent,
    contentTypeSplit,
    searchTerms,
    dailyTrend,
    hourly,
    landingPages,
    formatNumber,
    formatCompact,
    pct,
  }
}

export { formatNumber, formatCompact, toDateStr }
