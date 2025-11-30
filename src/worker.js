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
        if (regex.test(text)) {
            console.log("Profanity detected:", bad);
            return true;
        };
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
    console.log("Spam check score:", data);
    return data.score >= 8;
}

export default {
        async fetch(request, env, ctx) {
            if (request.method === "OPTIONS") return new Response(null, { status: 204 });
            if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

            let token;

            try {
                const auth = request.headers.get("Authorization");
                if (!auth) throw "Missing auth header";
                token = auth.split(" ")[1];
            } catch {
                return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
            }

            // 🔐 VERIFY FIREBASE ID TOKEN
            let decoded;
            try {
                decoded = await jwtVerify(token, JWKS, {
                    issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
                    audience: FIREBASE_PROJECT_ID
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: "Invalid Token" }), { status: 401 });
            }

            // Authenticated user
            const uid = decoded.payload.user_id;
            const displayName = decoded.payload.name || "Anonymous";

            const body = await request.json();
            if (!body.message) return new Response(JSON.stringify({ error: "Missing message" }), { status: 400 });

            if (containsProfanity(body.message)) {
                return new Response(JSON.stringify({ error: "Inappropriate content detected. Please remove them and try again." }), { status: 400 });
            }

            if (await checkSpam(body.message)) {
                return new Response(JSON.stringify({ error: "This looks like spam. Please try again later." }), { status: 400 });
            }

            // await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         user_id: "x3W7CWcYMOJJ_XUHF",
            //         service_id: "service_qskfpcj",
            //         template_id: "template_21t2lau",
            //         template_params: { name: displayName, feedback: body.message, uid }
            //     })
            // });

            return new Response(JSON.stringify({ success: true }), {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }
    };
