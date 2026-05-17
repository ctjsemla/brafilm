import { writeFileSync } from 'fs'
import gifenc from 'gifenc'

const { GIFEncoder, quantize, applyPalette } = gifenc

const W = 234
const H = 60

const FONT = {
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  G: ['01111', '10000', '10000', '10011', '10001', '10001', '01111'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
}

function drawText(rgba, text, x0, y0, scale, color) {
  let x = x0
  for (const ch of text.toUpperCase()) {
    const glyph = FONT[ch] || FONT[' ']
    for (let row = 0; row < glyph.length; row++) {
      for (let col = 0; col < glyph[row].length; col++) {
        if (glyph[row][col] !== '1') continue
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const px = x + col * scale + sx
            const py = y0 + row * scale + sy
            if (px < 0 || py < 0 || px >= W || py >= H) continue
            const i = (py * W + px) * 4
            rgba[i] = color[0]
            rgba[i + 1] = color[1]
            rgba[i + 2] = color[2]
            rgba[i + 3] = 255
          }
        }
      }
    }
    x += (glyph[0].length + 1) * scale
  }
}

function fillFrame(variant, phase) {
  const rgba = new Uint8Array(W * H * 4)

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      const t = y / H
      const sweep = Math.sin((x / W) * 6.28 + phase * 6.28) * 0.5 + 0.5

      if (variant === 'sportingbet') {
        rgba[i] = Math.min(255, 8 + t * 18 + sweep * 22)
        rgba[i + 1] = Math.min(255, 28 + t * 55 + sweep * 40)
        rgba[i + 2] = Math.min(255, 70 + t * 40 + sweep * 25)
      } else {
        rgba[i] = Math.min(255, 10 + t * 20 + sweep * 15)
        rgba[i + 1] = Math.min(255, 16 + t * 28 + sweep * 20)
        rgba[i + 2] = Math.min(255, 12 + t * 18 + sweep * 10)
      }
      rgba[i + 3] = 255
    }
  }

  if (variant === 'sportingbet') {
    drawText(rgba, 'SPORTINGBET', 10, 14, 2, [255, 255, 255])
    drawText(rgba, 'APOSTAS .BET.BR', 10, 38, 1, [253, 207, 90])
  } else {
    drawText(rgba, 'BETNACIONAL', 10, 14, 2, [245, 197, 24])
    drawText(rgba, 'A BET DO BRASIL', 10, 38, 1, [34, 197, 94])
  }

  return rgba
}

function encodeGif(variant, frames = 10) {
  const gif = GIFEncoder()
  for (let f = 0; f < frames; f++) {
    const rgba = fillFrame(variant, f / frames)
    const palette = quantize(rgba, 256)
    const index = applyPalette(rgba, palette)
    gif.writeFrame(index, W, H, { palette, delay: 100, repeat: 0 })
  }
  gif.finish()
  return Buffer.from(gif.bytes())
}

writeFileSync('public/banners/sportingbet.gif', encodeGif('sportingbet'))
writeFileSync('public/banners/betnacional.gif', encodeGif('betnacional'))
console.log('OK: sportingbet.gif + betnacional.gif')
