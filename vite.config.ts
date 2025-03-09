import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'submodules/www-sacred/components'),
      '@common': path.resolve(__dirname, 'submodules/www-sacred/common'),
      '@root': path.resolve(__dirname, 'submodules/www-sacred'),
    },
  },
})
