import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [
    solidPlugin(),
    crx({ manifest }),
    (function() {
      return {
        name: 'no-crossorigin-attr',
        transformIndexHtml(html) {
          return html.replace(' crossorigin', '');
        }
      }
    })(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: 'false',
  },
});
