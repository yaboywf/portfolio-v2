import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	plugins: [
		solid(),
		visualizer({
			filename: 'stats.html',
			open: true,
			gzipSize: true,
			brotliSize: true,
		})
	],
	resolve: {
		tsconfigPaths: true
	}
})
