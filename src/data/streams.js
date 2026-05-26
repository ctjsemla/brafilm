/**
 * Fontes de reprodução — use apenas URLs que você tem direito de exibir.
 * Tipos: youtube (trailer/demo), mp4 (arquivo direto), iframe (embed genérico).
 */
const DEMO_MP4 =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

/** Trailers oficiais / demos por slug */
const STREAMS = {
  'devoradores-de-estrelas': { type: 'youtube', id: 'KbQosCgrShs' },
  'deadpool-wolverine': { type: 'youtube', id: 'IDrSKhCqcuY' },
  'duna-parte-dois': { type: 'youtube', id: '8gTLlVxciEz' },
  'divertida-mente-2': { type: 'youtube', id: 'LEjhYqen4mk' },
  'gladiador-ii': { type: 'youtube', id: '4rgYUipGJNo' },
  'moana-2': { type: 'youtube', id: 'hDzgO2Mqm84' },
  'alien-romulus': { type: 'youtube', id: 'GTNMt84KT0k' },
  'wicked': { type: 'youtube', id: '6COmYeLsz4M' },
  'breaking-bad': { type: 'youtube', id: 'Hhez-f1_aHk' },
  'la-casa-de-papel': { type: 'youtube', id: '_InqQJRqGW4' },
  'round-6': { type: 'youtube', id: 'oqxAJKy0iiw' },
  'the-last-of-us': { type: 'youtube', id: 'uLtkt8BonwM' },
  'the-boys': { type: 'youtube', id: 'M1bhOaLV4FU' },
  'wednesday': { type: 'youtube', id: 'Di310WS8zLk' },
  'fallout': { type: 'youtube', id: 'H0tyyqq09PQ' },
  'berlim-e-a-dama-com-arminho': { type: 'youtube', id: 'Q1QcLfkUy4g' },
  'berlim-destaque': { type: 'youtube', id: 'Q1QcLfkUy4g' },
  'justiceiro-destaque': { type: 'youtube', id: 'L29BIm7lA2E' },
  'devoradores-destaque': { type: 'youtube', id: 'KbQosCgrShs' },
  'the-boys-destaque': { type: 'youtube', id: 'M1bhOaLV4FU' },
  'o-justiceiro-uma-ultima-morte': { type: 'youtube', id: 'L29BIm7lA2E' },
  'emilia-perez': { type: 'youtube', id: 'hR0XnEqNh9g' },
}

export function getStream(slug) {
  const entry = STREAMS[slug]
  if (!entry) {
    return { type: 'mp4', src: DEMO_MP4, label: 'demo' }
  }
  if (entry.type === 'youtube') {
    return {
      type: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${entry.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      label: 'trailer',
    }
  }
  if (entry.type === 'iframe') {
    return { type: 'iframe', src: entry.src, label: entry.label || 'embed' }
  }
  if (entry.type === 'mp4') {
    return { type: 'mp4', src: entry.src, label: 'mp4' }
  }
  return { type: 'mp4', src: DEMO_MP4, label: 'demo' }
}
