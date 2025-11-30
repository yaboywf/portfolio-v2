import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(
    new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

const FIREBASE_PROJECT_ID = "your-project-id";

export default {
    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204 });
        }

        if (request.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405 });
        }

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

        const body = await request.json();

        // ⬇️ SEND EMAIL VIA EMAILJS
        const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: "service_qskfpcj",
                template_id: "template_21t2lau",
                user_id: "x3W7CWcYMOJJ_XUHF",
                template_params: {
                    name: body.name,
                    feedback: body.message,
                    uid
                }
            })
        });

        const emailJson = await emailRes.json();

        return new Response(JSON.stringify({ success: true, email: emailJson }), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
};
