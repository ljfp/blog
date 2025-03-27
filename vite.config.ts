import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { plugin as markdown, Mode } from 'vite-plugin-markdown'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdown({ mode: [Mode.REACT] })
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'submodules/www-sacred/components'),
      '@common': path.resolve(__dirname, 'submodules/www-sacred/common'),
      '@root': path.resolve(__dirname, 'submodules/www-sacred'),
      '@content': path.resolve(__dirname, 'content'),
    },
  },
})
