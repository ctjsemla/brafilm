import { adBanners } from '../data/banners'
import './AdBanners.css'
import './MovieRow.css'

export function bannerSrc(path) {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}

function BannerSlot({ banner }) {
  const slotLabel = `Banner ${banner.id}`

  return (
    <a
      href={banner.href}
      className="ad-banners__slot"
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label={banner.alt || slotLabel}
    >
      <span className="ad-banners__ads-tag">ADS</span>
      <img
        src={bannerSrc(banner.image)}
        alt={banner.alt || slotLabel}
        className="ad-banners__gif"
        width={banner.width}
        height={banner.height}
        loading="lazy"
      />
    </a>
  )
}

export default function AdBanners() {
  return (
    <section className="ad-banners row" aria-label="Patrocínios">
      <div className="row__header ad-banners__header">
        <h2 className="row__title">
          <span className="row__bar" aria-hidden />
          Patrocínios
        </h2>
      </div>
      <div className="ad-banners__viewport">
        <div className="ad-banners__track">
          {adBanners.map((banner) => (
            <BannerSlot key={banner.id} banner={banner} />
          ))}
        </div>
      </div>
    </section>
  )
}
