import Introduction from "./Intro";
import SubIntro from "./SubIntro";
import Techstack from "./Techstack";
import Certs from "./Certs.tsx";
import Footer from "../Footer";
import "@/styles/general.scss";
import "./nav.scss";
import { onMount } from "solid-js";
import { A } from "@solidjs/router";

const Main = () => {
    onMount(() => document.title = "Dylan Yeo | Home");

    return (
        <main>
            <Introduction></Introduction>
            <SubIntro></SubIntro>
            <Techstack></Techstack>
            <Certs></Certs>

            <h2 class="redirect-header">Want to know more?</h2>
            <div class="redirect-container">
                <div class="redirect" style={{ '--icon': '"\\f135"' }}>
                    <p>Explore My Experience</p>
                    <p>Discover my professional journey and projects</p>
                    <A href="/experience">View Experience</A>
                </div>

                <div class="redirect" style={{ '--icon': '"\\f82d"' }}>
                    <p>Get In Touch</p>
                    <p>Feel free to reach out for collaborations or opportunities</p>
                    <A href="/contact">Contact Me</A>
                </div>
            </div>

            <Footer></Footer>
        </main>
    );
};

export default Main;