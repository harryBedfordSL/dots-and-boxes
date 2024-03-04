import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/dots-and-boxes/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    coverage: {
      reporter: ['text', 'html'],
      enabled: true,
      exclude: [
        '.eslintrc.cjs',
        'env.d.ts',
        'src/types.ts',
        'src/main.ts',
      ],
    },
    globals: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**'],
  }
})
