import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^~\/(.+)/, replacement: '/app/$1' },
      { find: /^@generated\/(.+)/, replacement: '/generated/$1' },
    ],
  },
  test: {
    coverage: {
      include: ['app/**/*.{ts,tsx}'],
    },
    environment: 'jsdom',
    globals: true,
    include: ['./app/**/*.test.{ts,tsx}'],
    restoreMocks: true,
    setupFiles: ['./test/jest-dom.ts', './test/vitest-cleanup-after-each.ts'],
  },
})
