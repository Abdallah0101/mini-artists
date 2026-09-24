import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH é definido pelo GitHub Actions como /<nome-do-repo>/ para o Pages.
// Em desenvolvimento local, usa "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
