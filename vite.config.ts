import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	plugins: [
		solid(),
		tsconfigPaths(),
		visualizer({
			filename: 'stats.html',
			open: true,
			gzipSize: true,
			brotliSize: true,
		})
	]
})
