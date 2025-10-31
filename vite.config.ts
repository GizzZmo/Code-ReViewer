import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Code-ReViewer/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
