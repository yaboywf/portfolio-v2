import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig, lazyPlugins } from "vite-plus";
import preact from "@preact/preset-vite";

export default defineConfig({
    fmt: {
        printWidth: 180,
        tabWidth: 4,
        singleQuote: false,
        semi: true,
        trailingComma: "all",
        sortPackageJson: false,
        sortImports: {
            groups: ["value-named-import", "type-import", "value-named-default-import", "value-default-import", "side_effect", "unknown"],
            newlinesBetween: false,
            order: "asc",
        },
    },

    lint: {
        plugins: ["oxc", "typescript", "unicorn", "jsx-a11y", "react"],
        jsPlugins: [
            "eslint-plugin-security",
            "eslint-plugin-no-unsanitized",
            {
                name: "vite-plus",
                specifier: "vite-plus/oxlint-plugin",
            },
        ],
        categories: {
            correctness: "warn",
        },
        ignorePatterns: ["dist/**", "coverage/**", "node_modules/**"],
        rules: {
            "no-unused-vars": "error",
            "no-unused-expressions": "error",
            "no-var": "error",
            "prefer-const": "error",

            "typescript/no-explicit-any": "error",
            "typescript/ban-ts-comment": "error",
            "typescript/no-non-null-asserted-optional-chain": "error",
            "typescript/consistent-type-imports": [
                "error",
                {
                    prefer: "type-imports",
                    fixStyle: "separate-type-imports",
                },
            ],

            "security/detect-eval-with-expression": "warn",
            "security/detect-object-injection": "warn",
            "security/detect-unsafe-regex": "warn",

            "no-unsanitized/property": "error",
            "no-unsanitized/method": "error",

            "vite-plus/prefer-vite-plus-imports": "error",
        },
        overrides: [
            {
                files: ["src/**/*.{jsx,tsx}"],
                rules: {
                    "jsx-a11y/heading-has-content": "error",
                    "jsx-a11y/anchor-has-content": "error",
                    "jsx-a11y/anchor-is-valid": "error",
                    "jsx-a11y/alt-text": "error",
                    "jsx-a11y/click-events-have-key-events": "error",
                    "jsx-a11y/no-static-element-interactions": "error",
                    "jsx-a11y/interactive-supports-focus": "error",
                    "jsx-a11y/control-has-associated-label": "warn",
                },
            },
        ],
        options: {
            typeAware: true,
            typeCheck: true,
        },
    },

    plugins: lazyPlugins(() => [
        preact({
            prerender: {
                enabled: true,
                renderTarget: "body",
            },
        }),

        imagetools(),

        visualizer({
            filename: "stats.html",
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),

        VitePWA({
            injectRegister: "inline",
            registerType: "autoUpdate",
            workbox: {
                navigateFallback: null,
                globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,jxl,svg,webp,woff,woff2,ttf}"],
                globIgnores: ["**/webfonts/solid.ttf", "**/webfonts/regular.ttf", "**/webfonts/brands.ttf", "stats.html"],
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
    ]),
});
