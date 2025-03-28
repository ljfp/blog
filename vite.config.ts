import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { plugin as markdown, Mode } from 'vite-plugin-markdown'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdown({ mode: [Mode.REACT] }),
    // Plugin to handle the eval warning in gray-matter
    {
      name: 'patch-gray-matter',
      configResolved() {
        // Check if the patched file exists
        const patchedFile = path.resolve(__dirname, 'patches/gray-matter/engines.js');
        if (fs.existsSync(patchedFile)) {
          // Copy our patched version to node_modules
          const targetFile = path.resolve(__dirname, 'node_modules/gray-matter/lib/engines.js');
          fs.copyFileSync(patchedFile, targetFile);
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'submodules/www-sacred/components'),
      '@common': path.resolve(__dirname, 'submodules/www-sacred/common'),
      '@root': path.resolve(__dirname, 'submodules/www-sacred'),
      '@content': path.resolve(__dirname, 'content'),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Extract CSS into separate files
        assetFileNames: 'assets/[name]-[hash][extname]',
        // More granular code splitting strategy
        manualChunks: (id) => {
          // Create separate chunks for React and related libraries
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router/') || id.includes('react-router-dom/')) {
              return 'react-vendor';
            }
            if (id.includes('gray-matter')) {
              return 'markdown-tools';
            }
            if (id.includes('@mdx-js') || id.includes('remark') || id.includes('unified') || id.includes('micromark')) {
              return 'markdown-compiler';
            }
            // Group remaining node_modules into a chunk
            return 'vendor';
          }
          
          // Split application code by directories
          if (id.includes('/components/')) {
            return 'components';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
          if (id.includes('/utils/')) {
            return 'utils';
          }
          
          // Default chunk for anything else
          return 'index';
        }
      }
    }
  },
})
