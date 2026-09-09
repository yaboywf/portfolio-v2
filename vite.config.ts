import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";
import { imagetools } from "vite-imagetools";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		preact(),
		viteSingleFile(),
		imagetools(),
		visualizer({
			filename: 'stats.html',
			open: false,
			gzipSize: true,
			brotliSize: true,
		}),
		VitePWA({
			injectRegister: "inline",
			registerType: "autoUpdate",
			workbox: {
				globPatterns: [
					"**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,woff,woff2,ttf}",
				],
				globIgnores: [
					"**/webfonts/solid.ttf",
					"**/webfonts/regular.ttf",
					"**/webfonts/brands.ttf",
				],
				cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true,
			},
			manifest: {
                name: "Portfolio",
                short_name: "Portfolio",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "/favicon.ico",
                        sizes: "48x48",
                        type: "image/x-icon",
                    },
                ],
            },
		}),
	],
})
