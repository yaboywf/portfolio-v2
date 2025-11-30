import { jwtVerify, createRemoteJWKSet } from "jose";
import PROFANITY_LIST from "./words.txt";

const JWKS = createRemoteJWKSet(
    new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

const PROFANITY = PROFANITY_LIST.split("\n")
    .map(w => w.trim().toLowerCase())
    .filter(Boolean);

const FIREBASE_PROJECT_ID = "portfolio-870ce";

function containsProfanity(message) {
    const text = message.toLowerCase();

    // simple substring match (fast)
    for (const bad of PROFANITY) {
        const regex = new RegExp(`\\b${bad}\\b`, "i");
        if (regex.test(text)) return true;
    }

    // safer boundary detection
    const cleaned = text.replace(/[^a-z0-9]+/g, " ");
    const words = cleaned.split(/\s+/);

    for (const bad of PROFANITY) {
        if (words.includes(bad)) return true;
    }

    return false;
}

async function checkSpam(message) {
    const resp = await fetch("https://spamcheck.postmarkapp.com/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: `Content-Type: text/plain; charset=utf-8\n\n${message}`,
            options: "short"
        })
    })

    const data = await resp.json();
    return data.score >= 8;
}

function jsonResponse(data = {}, status = 200) {
    return new Response((data === null ? null : JSON.stringify(data)), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Max-Age": "86400"
        }
    });
}

export default {
    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") return jsonResponse(null, 204);
        if (request.method !== "POST") return jsonResponse({ error: "Method Not Allowed" }, 405);

        let token;

        try {
            const auth = request.headers.get("Authorization");
            if (!auth) throw "Missing auth header";
            token = auth.split(" ")[1];
        } catch {
            return jsonResponse({ error: "Missing auth header" }, 401);
        }

        // 🔐 VERIFY FIREBASE ID TOKEN
        let decoded;
        try {
            decoded = await jwtVerify(token, JWKS, {
                issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
                audience: FIREBASE_PROJECT_ID
            });
        } catch (e) {
            return jsonResponse({ error: "Unauthorized" }, 401);
        }

        // Authenticated user
        const uid = decoded.payload.user_id;
        const displayName = decoded.payload.name || "Anonymous";

        const body = await request.json();
        if (!body.message) return jsonResponse({ error: "Message is required" }, 400);
        if (containsProfanity(body.message)) return jsonResponse({ error: "Inappropriate content detected in message." }, 400);
        if (await checkSpam(body.message)) return jsonResponse({ error: "Message detected as spam and will not be sent." }, 400);

        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: "x3W7CWcYMOJJ_XUHF",
                service_id: "service_qskfpcj",
                template_id: "template_21t2lau",
                template_params: { name: displayName, feedback: body.message, uid }
            })
        });

        return jsonResponse({ success: true });
    }
};
