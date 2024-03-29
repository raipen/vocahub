import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import _ from 'json-bigint';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/front',
  envDir: '../../',
  define: {
    __REDIRECT_URI__: JSON.stringify(process.env.REDIRECT_URI),
    __GOOGLE_CLIENT_ID__: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
    __KAKAO_CLIENT_ID__: JSON.stringify(process.env.KAKAO_CLIENT_ID),
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      },
    },
  }
})
