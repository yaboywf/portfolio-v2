import { defineConfig } from "@yaboywf/font-subsetter/config";

export default defineConfig({
    scanDirs: [
        "src",
        "public",
    ],

    outputDirectory: "public/webfonts",

    cssDirectory: "src/",

    extensions: [
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".css",
        ".scss",
        ".html",
    ],

    fonts: [
        "brands",
        "regular",
    ],

    include: [
        "regular:fa-code",
        "regular:fa-server",
        "regular:fa-database",
        "regular:fa-mobile",
        "regular:fa-gamepad",
        "regular:fa-infinity",
    ]
});