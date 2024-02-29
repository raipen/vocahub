import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/front',
  plugins: [react(), tsconfigPaths()],
  publicDir: 'src/front/public',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      },
    },
  },
})
