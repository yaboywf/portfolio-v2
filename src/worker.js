import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(
    new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

const FIREBASE_PROJECT_ID = "portfolio-870ce";

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

        // ⬇️ SEND EMAIL VIA EMAILJS
        const emailRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                personalizations: [
                    {
                        to: [
                            {
                                email: "dylanyeowf@gmail.com"
                            }
                        ]
                    }
                ],
                from: { email: "noreply@portfolio.dylanyeowf.workers.dev", name: displayName },
                subject: "New Feedback",
                content: [
                    {
                        type: "text/html",
                        value: `
<div style="font-family: sans-serif;">
    <h1>Hello Dylan,</h1>
    <p>A feedback was given to you. This originated from your portfolio website.</p>

    <h3>Name:</h3>
    <p style="border: 1px solid black; padding: 10px;">${displayName}</p>
    <h3>Feedback:</h3>
    <p style="border: 1px solid black; padding: 10px;">${body.message}</p>

    <p>Thank you!</p>

    <hr>

    <p>This is an auto-generated email. Please do not reply.</p>
</div>
                        `
                    }
                ]
            })
        });

        let emailJson;
        const text = await emailRes.text();

        try {
            emailJson = JSON.parse(text);
        } catch {
            emailJson = { raw: text, success: emailRes.ok };
        }

        return new Response(JSON.stringify({ success: true, email: emailJson }), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
};
