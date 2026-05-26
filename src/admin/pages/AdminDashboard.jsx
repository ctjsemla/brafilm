import { useMemo, useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext.jsx'
import { buildAnalytics, getPresetRange } from '../data/analyticsMock.js'
import DateRangeFilter from '../components/DateRangeFilter.jsx'
import './AdminDashboard.css'

function StatCard({ label, value, sub, trend }) {
  return (
    <article className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {sub && <p className="stat-card__sub">{sub}</p>}
      {trend && <p className="stat-card__trend">{trend}</p>}
    </article>
  )
}

function BarRows({ items, valueKey = 'visits', max }) {
  const peak = max ?? Math.max(...items.map((i) => i[valueKey]), 1)
  return (
    <ul className="bar-rows">
      {items.map((item) => (
        <li key={item.label || item.code || item.hour} className="bar-rows__item">
          <div className="bar-rows__head">
            <span className="bar-rows__label">{item.label}</span>
            <span className="bar-rows__val">
              {item.pctLabel || new Intl.NumberFormat('en-US').format(item[valueKey])}
            </span>
          </div>
          <div className="bar-rows__track">
            <div
              className="bar-rows__fill"
              style={{ width: `${(item[valueKey] / peak) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

function MiniTrend({ data }) {
  const max = Math.max(...data.map((d) => d.visits), 1)
  return (
    <div className="mini-trend" role="img" aria-label="Daily visits trend">
      {data.map((d) => (
        <div
          key={d.date}
          className="mini-trend__bar"
          style={{ height: `${(d.visits / max) * 100}%` }}
          title={`${d.label}: ${d.visits.toLocaleString()} visits`}
        />
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const { admin, logout } = useAdmin()
  const [range, setRange] = useState(() => getPresetRange('this_month'))

  useEffect(() => {
    if (!range) setRange(getPresetRange('this_month'))
  }, [range])

  const data = useMemo(() => (range ? buildAnalytics(range) : null), [range])

  if (!data) return null

  const { summary, formatNumber, formatCompact } = data
  const maxCountry = Math.max(...data.countries.map((c) => c.visits))
  const maxSource = Math.max(...data.sources.map((s) => s.visits))
  const maxHour = Math.max(...data.hourly.map((h) => h.visits))

  return (
    <div className="admin-dash">
      <header className="admin-dash__header">
        <div className="admin-dash__header-left">
          <h1 className="admin-dash__title">Analytics</h1>
          <p className="admin-dash__period">
            {data.range.label} · {data.range.start} → {data.range.end} ·{' '}
            {data.range.days} days
          </p>
        </div>
        <div className="admin-dash__header-right">
          <span className="admin-dash__user">{admin?.email}</span>
          <button type="button" className="admin-dash__logout" onClick={logout}>
            Log out
          </button>
          <a href="/" className="admin-dash__site">
            View site
          </a>
        </div>
      </header>

      <div className="admin-dash__filters">
        <DateRangeFilter onChange={setRange} />
      </div>

      <p className="admin-dash__benchmark">
        Traffic benchmarked against Superflix-tier BR streaming portals (~600K visits/mo baseline).
      </p>

      <section className="admin-dash__section">
        <h2 className="admin-dash__h2">Overview</h2>
        <div className="stat-grid">
          <StatCard
            label="Total visits"
            value={formatCompact(summary.visits)}
            sub={formatNumber(summary.visits)}
            trend={`${summary.visitsChange} vs prior period`}
          />
          <StatCard
            label="Unique visitors"
            value={formatCompact(summary.uniqueVisitors)}
            sub={formatNumber(summary.uniqueVisitors)}
          />
          <StatCard
            label="Page views"
            value={formatCompact(summary.pageViews)}
            sub={formatNumber(summary.pageViews)}
          />
          <StatCard
            label="Total clicks"
            value={formatCompact(summary.clicks)}
            sub={formatNumber(summary.clicks)}
            trend={`${summary.clicksChange} vs prior period`}
          />
          <StatCard label="Avg. session" value={summary.avgSession} sub="Per visit" />
          <StatCard label="Bounce rate" value={summary.bounceRate} />
          <StatCard
            label="Pages / session"
            value={summary.pagesPerSession}
            sub={`${summary.clicksPerVisit} clicks per visit`}
          />
          <StatCard
            label="New sign-ups"
            value={formatCompact(summary.registrations)}
            sub={`${summary.newUsersPct} new · ${summary.returningUsersPct} returning`}
          />
        </div>
      </section>

      <section className="admin-dash__section admin-dash__section--split">
        <div className="panel">
          <h2 className="admin-dash__h2">Daily trend</h2>
          <MiniTrend data={data.dailyTrend} />
          <ul className="trend-legend">
            <li>Visits: {formatCompact(data.dailyTrend.reduce((s, d) => s + d.visits, 0))}</li>
            <li>Clicks: {formatCompact(data.dailyTrend.reduce((s, d) => s + d.clicks, 0))}</li>
          </ul>
        </div>
        <div className="panel">
          <h2 className="admin-dash__h2">Engagement</h2>
          <ul className="engagement-list">
            <li>
              <span>Trailer plays</span>
              <strong>{formatNumber(summary.trailerPlays)}</strong>
            </li>
            <li>
              <span>Search queries</span>
              <strong>{formatNumber(summary.searchQueries)}</strong>
            </li>
            <li>
              <span>Banner ad clicks</span>
              <strong>{formatNumber(summary.bannerClicks)}</strong>
            </li>
            <li>
              <span>Avg. watch time (top titles)</span>
              <strong>38 min</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="admin-dash__section admin-dash__grid-2">
        <div className="panel">
          <h2 className="admin-dash__h2">Traffic sources</h2>
          <BarRows
            items={data.sources.map((s) => ({
              label: s.label,
              visits: s.visits,
              pctLabel: s.pctLabel,
            }))}
            max={maxSource}
          />
        </div>
        <div className="panel">
          <h2 className="admin-dash__h2">Devices</h2>
          <div className="device-bars">
            {data.devices.map((d) => (
              <div key={d.id} className="device-bar">
                <div className="device-bar__label">
                  <span>{d.label}</span>
                  <span>{data.pct(d.share)}</span>
                </div>
                <div className="device-bar__track">
                  <div
                    className={`device-bar__fill device-bar__fill--${d.id}`}
                    style={{ width: `${d.share * 100}%` }}
                  />
                </div>
                <p className="device-bar__meta">
                  {formatNumber(d.visits)} visits · {formatNumber(d.clicks)} clicks
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-dash__section admin-dash__grid-2">
        <div className="panel">
          <h2 className="admin-dash__h2">Geography</h2>
          <BarRows
            items={data.countries.map((c) => ({
              label: `${c.label} (${c.code})`,
              visits: c.visits,
              pctLabel: c.pctLabel,
            }))}
            max={maxCountry}
          />
        </div>
        <div className="panel">
          <h2 className="admin-dash__h2">Peak hours (UTC−3)</h2>
          <div className="hour-chart">
            {data.hourly.map((h) => (
              <div
                key={h.hour}
                className="hour-chart__col"
                title={`${h.hour}: ${h.visits.toLocaleString()}`}
              >
                <div
                  className="hour-chart__bar"
                  style={{ height: `${(h.visits / maxHour) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <p className="hour-chart__note">Evening peak 19:00–23:00</p>
        </div>
      </section>

      <section className="admin-dash__section admin-dash__grid-2">
        <div className="panel">
          <h2 className="admin-dash__h2">Movies vs series</h2>
          <ul className="type-split">
            {data.contentTypeSplit.map((t) => (
              <li key={t.label}>
                <span>{t.label}</span>
                <strong>{data.pct(t.share)}</strong>
                <small>
                  {formatNumber(t.visits)} visits · {formatNumber(t.clicks)} clicks
                </small>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2 className="admin-dash__h2">Top landing pages</h2>
          <ul className="landing-list">
            {data.landingPages.map((p) => (
              <li key={p.path}>
                <span>{p.label}</span>
                <strong>{formatCompact(p.views)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="admin-dash__section">
        <h2 className="admin-dash__h2">Top search terms</h2>
        <div className="tag-cloud">
          {data.searchTerms.map((t) => (
            <span key={t.term} className="tag-cloud__tag">
              {t.term}
              <em>{formatCompact(t.count)}</em>
            </span>
          ))}
        </div>
      </section>

      <section className="admin-dash__section">
        <h2 className="admin-dash__h2">Top titles by clicks &amp; watch time</h2>
        <div className="table-wrap">
          <table className="content-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Clicks</th>
                <th>Views</th>
                <th>Avg. watch</th>
                <th>Completion</th>
              </tr>
            </thead>
            <tbody>
              {data.topContent.map((row, i) => (
                <tr key={row.slug}>
                  <td>{i + 1}</td>
                  <td className="content-table__title">{row.title}</td>
                  <td>
                    <span
                      className={`content-table__type content-table__type--${row.type.toLowerCase()}`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td>{formatNumber(row.clicks)}</td>
                  <td>{formatNumber(row.views)}</td>
                  <td>{row.avgWatchMin} min</td>
                  <td>{row.completionPct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
