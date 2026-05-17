import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'public/banners')
const required = ['chicas-escort.gif', 'seemeprivate.gif', 'sportingbet.gif', 'betnacional.gif']

mkdirSync(dir, { recursive: true })

const assets = join(root, '../../.cursor/projects/Users-lucifer-Documents-firstproject/assets')
const copies = [
  ['nw6imogiku-ad09925e-281b-4e96-9264-7c970f4d19d7.png', 'chicas-escort.gif'],
  ['9nr7djk7ed-750489f5-2c2a-4991-8616-849b698ff256.png', 'seemeprivate.gif'],
]

for (const [src, dest] of copies) {
  const from = join(assets, src)
  const to = join(dir, dest)
  if (!existsSync(to) && existsSync(from)) copyFileSync(from, to)
}

if (!existsSync(join(dir, 'sportingbet.gif')) || !existsSync(join(dir, 'betnacional.gif'))) {
  execSync('node scripts/generate-promo-gifs.mjs', { cwd: root, stdio: 'inherit' })
}

const missing = required.filter((f) => !existsSync(join(dir, f)))
if (missing.length) {
  console.warn('Banner files missing:', missing.join(', '))
  process.exit(1)
}
