import styles from './intro.module.css';
import pfp from "../../assets/pfp.png?w=800&format=webp";
import pfpSrcSet from "../../assets/pfp.png?w=400;600;800;1041&format=webp&as=srcset";

const Intro = () => {
    return (
        <div class={styles.intro_container}>
            <img
                className={styles.pfp}
                src={pfp}
                srcSet={pfpSrcSet}
                sizes="(max-width: 600px) 90vw, 794px"
                alt="Portrait of Dylan Yeo"
                width="1041"
                height="1511"
                fetchPriority="high"
                loading="eager"
                decoding="async"
            />
            <div className={styles.background_shade}></div>

            <p class={styles.sub_heading}>Hello! I'm</p>
            <div class={styles.heading}>
                Dylan
                <span> Yeo</span>
            </div>

            <div class={styles.bio}>
                <p>Year 3 student based in Singapore pursing a Diploma in Information Technology at Temasek Polytechnic.</p>
                <div class={styles.socials}>
                    <a href="https://github.com/yaboywf" target='_blank' aria-label="View my GitHub profile">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/dylanyeowenfeng" target='_blank' aria-label="View my LinkedIn profile">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="mailto:dylanyeowf@gmail.com" target='_blank' aria-label="Email me">
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                    <a href="https://www.instagram.com/yaboywf/" target='_blank' aria-label="View my Instagram profile">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://t.me/yaboywf" target='_blank' aria-label="View my Telegram profile">
                        <i className="fa-brands fa-telegram"></i>
                    </a>
                </div>

                <a href="/portfolio.pdf" download="portfolio.pdf">View my Resume</a>
            </div>
        </div>
    );
};

export default Intro;