import { chromium } from "playwright";
import {
    mkdir,
    readFile,
    writeFile,
} from "node:fs/promises";
import path from "node:path";

const certificateFile =
    "src/components/Certificate/certificate.json";

const previewDirectory =
    "public/previews";

function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function getImageExtension(contentType) {
    const extensions = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/gif": "gif",
        "image/avif": "avif",
    };

    return extensions[contentType] ?? null;
}

async function saveOgImage(page, slug) {
    const ogImage = await page
        .locator('meta[property="og:image"]')
        .first()
        .getAttribute("content", {
            timeout: 2000,
        })
        .catch(() => null);

    if (!ogImage) {
        return null;
    }

    const imageUrl = new URL(
        ogImage,
        page.url(),
    ).href;

    const response = await fetch(imageUrl);

    if (!response.ok) {
        return null;
    }

    const contentType = response.headers
        .get("content-type")
        ?.split(";")[0];

    const extension =
        getImageExtension(contentType);

    if (!extension) {
        return null;
    }

    const fileName = `${slug}.${extension}`;
    const outputPath = path.join(
        previewDirectory,
        fileName,
    );

    const image = Buffer.from(
        await response.arrayBuffer(),
    );

    await writeFile(outputPath, image);

    return `/previews/certificates/${fileName}`;
}

async function takeScreenshot(page, slug) {
    const fileName = `${slug}.jpg`;
    const outputPath = path.join(
        previewDirectory,
        fileName,
    );

    await page.screenshot({
        path: outputPath,
        type: "jpeg",
        quality: 60,
        fullPage: false,
    });

    return `/previews/certificates/${fileName}`;
}

async function generatePreview(
    page,
    certificate,
) {
    await page.goto(certificate.link, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
    });

    const slug = createSlug(
        certificate.title,
    );

    const ogPreview = await saveOgImage(
        page,
        slug,
    );

    if (ogPreview) {
        console.log(
            `OG image: ${certificate.title}`,
        );

        return ogPreview;
    }

    console.log(
        `Screenshot: ${certificate.title}`,
    );

    return takeScreenshot(page, slug);
}

async function main() {
    const certificates = JSON.parse(
        await readFile(
            certificateFile,
            "utf8",
        ),
    );

    await mkdir(previewDirectory, {
        recursive: true,
    });

    const browser = await chromium.launch({
        channel: "chrome",
        headless: false,
    });

    try {
        const context =
            await browser.newContext({
                viewport: {
                    width: 640,
                    height: 360,
                },
            });

        const page =
            await context.newPage();

        const updatedCertificates = [];

        for (const certificate of certificates) {
            try {
                const preview =
                    await generatePreview(
                        page,
                        certificate,
                    );

                updatedCertificates.push({
                    ...certificate,
                    preview,
                });
            } catch (error) {
                console.error(
                    `Failed: ${certificate.title}`,
                    error,
                );

                updatedCertificates.push(
                    certificate,
                );
            }
        }

        await writeFile(
            certificateFile,
            `${JSON.stringify(
                updatedCertificates,
                null,
                4,
            )}\n`,
        );

        console.log(
            "Certificate previews completed.",
        );
    } finally {
        await browser.close();
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});