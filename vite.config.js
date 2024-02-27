import { crx } from '@crxjs/vite-plugin';
import path from 'node:path';
import url from 'node:url';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';
import manifest from './manifest.json';

export default defineConfig({
	plugins: [
		solidPlugin(),
		crx({ manifest }),
		solidSvg({ defaultAsComponent: true }),
		(function () {
			return {
				name: 'no-crossorigin-attr',
				transformIndexHtml(html) {
					return html.replace(' crossorigin', '');
				},
			};
		})(),
	],
	server: {
		port: 3000,
	},
	assetsInclude: ['*.wasm'],
	base: './',
	build: {
		target: 'esnext',
		modulePreload: false,
		minify: 'false',
	},

	resolve: {
		alias: {
			'@': '/src',
			events: path.join(
				path.dirname(url.fileURLToPath(import.meta.url)),
				'node_modules',
				'events'
			),
		},
	},
});
