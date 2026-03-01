import { onMount, createSignal } from "solid-js";
import Particles from "@/components/Particles";
import "@/styles/general.scss";
import styles from "./contact.module.scss";
import { useNavigate } from "@solidjs/router";

const Contact = () => {
    const navigate = useNavigate();
    const [message, setMessage] = createSignal('');

    onMount(() => document.title = "Dylan Yeo | Contact Me");

    const onSubmit = async () => {
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                service_id: "service_qskfpcj",
                template_id: "template_21t2lau",
                user_id: "x3W7CWcYMOJJ_XUHF",
                template_params: {
                    feedback: message(),
                }
            })
        });

        if (response.ok) {
            showMessage("Thank you for your message", "success");
        } else {
            showMessage("Uh oh, something went wrong", "error");
        }
    }

    const showMessage = (message: string, type: 'error' | 'success' = 'error') => {
        const newError = document.createElement('div');
        newError.classList.add(styles.error);
        if (type === 'success') newError.classList.add(styles.success);
        newError.textContent = message;
        const container = document.querySelector('.' + styles.error_container);
        if (container) container.appendChild(newError);

        setTimeout(() => newError.remove(), 5000);
    }

    return (
        <main class={styles.contact}>
            <div class={styles.error_container}></div>
            <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.5}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={true}
            />

            <div class={styles.container}>
                <h2>
                    <i class="fa-regular fa-comment"></i>
                    I love some feedback
                </h2>

                <div class={styles.form}>
                    <h3>Leave a message</h3>
                    <textarea name="message" id="message" placeholder="Your message" value={message()} onInput={(e) => setMessage(e.target.value)}></textarea>
                    <div>
                        <button onClick={() => navigate(-1)}>Back</button>
                        <button onClick={onSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contact