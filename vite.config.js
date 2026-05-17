import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: repo adınız "brafilm" ise base: '/brafilm/'
// Kullanıcı adı.github.io repo'su ise base: '/'
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/brafilm/' : '/',
})
