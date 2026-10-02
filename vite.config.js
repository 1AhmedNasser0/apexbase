  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    // GitHub Pages project sites are served from /<repository-name>/.
    base: '/apexbase/',
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      allowedHosts: ['.e2b.app', '.arena.ai', 'localhost'],
    },
    preview: {
      host: '0.0.0.0',
      allowedHosts: ['.e2b.app', '.arena.ai', 'localhost'],
    },
  });
