import Projects from "./Projects";
import Particles from "@/components/Particles";
import BlurText from "@/components/TextEffect";
import Footer from "@/pages/Footer";
import "@/styles/general.scss";
import styles from './experience.module.scss'
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import Typewriter from "@/components/TypeWriter";
import '@/pages/intro/techstack.scss'

const text = `Experiences Overview
-------------------------------------------------------

[ WORK EXPERIENCE ]                 [ VOLUNTEER EXPERIENCE ]
- Temporary Warehouse Assistant     - People's Association
- Temporary Phone Handler           - Singapore Computer Society
- Sports Atrium Assistant/Packer    - The Boys' Brigade 21st Singapore Company

-------------------------------------------------------
END OF FILE
    `;

const Main = () => {
    const navigate = useNavigate();

    onMount(() => document.title = "Dylan Yeo | Experience");

    return (
        <main class={styles.experience}>
            <div class={styles.header}>
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.5}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={true}>
                </Particles>

                <div>
                    <BlurText text="My Experience" delay={150} animateBy="words" />
                    <button onClick={() => navigate("/")}>Return to Home</button>
                </div>
            </div>

            <div class="terminal-container" style={{ height: "300px", "margin-top": "20px" }}>
                <div class="terminal-header">
                    <div class="circle red"></div>
                    <div class="circle yellow"></div>
                    <div class="circle green"></div>
                    <div class="terminal-title">Terminal</div>
                </div>

                <div class="terminal-body">
                    <p>$ cat experience.txt</p>
                    <Typewriter text={text} />
                </div>
            </div>

            <Projects></Projects>
            <Footer></Footer>
        </main>
    );
};

export default Main;