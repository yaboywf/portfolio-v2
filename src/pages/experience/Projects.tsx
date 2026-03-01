import { createSignal, Show, onMount } from "solid-js";
import styles from "./projects.module.scss";

type ProjectGridProps = {
    gridColumn?: string;
    gridRow?: string;
    data: Project;
    onExpand: (el: HTMLDivElement, data: Project) => void;
}

type Project = {
    title: string;
    description: string;
    usage: string[];
    image: string;
    link?: string;
}

type MorphingCardProps = {
    expanded: {
        rect: DOMRect;
        data: Project;
    };
    onClose: () => void;
}

const projects: Project[] = [
    { title: "Ping Pong", description: "Users play the role of two ping-pong players. The game ends when one of the players scores 10 points.", usage: ["Pygame"], image: "pingpong.webp" },
    { title: "QR Code with Python", description: "A simple QR code generator using Python Turtle Module.", usage: ["Python"], image: "qrcode.webp" },
    { title: "The Boys' Brigade 21st Company Website", description: "Website for the company that showcases what it does as well as include several administrative features.", usage: ["React JS", "SCSS", "Firebase Authentication", "Firebase Firestore"], image: "bbwebsite.webp", link: "https://github.com/The-Boys-Brigade-21st-Company/BB-21st-Portal" },
    { title: "Teach & Tackle", description: "Cloud-based website that provides a platform for students mentor each other. Diploma Assignment.", usage: ["HTML", "CSS", "JavaScript", "AWS Cognito", "AWS Lambda", "AWS S3", "AWS DynamoDB", "AWS API Gateway", "AWS SES"], image: "teachtackle.webp", link: "https://github.com/yaboywf/CADV-Project" },
    { title: "Attendance System", description: "Website that aims to simplify an attendance process. Includes features such as self marking, form submission, etc. This website also includes user and shared based encryption, where only either the administrator or the user can decrypt the data.", usage: ["React JS", "SCSS", "Express JS", "Python", "Firebird SQL"], image: "attendance.webp", link: "https://github.com/yaboywf/attendance-system" },
    { title: "Multiplayer Rock Paper Scissors", description: "Multiplayer game that allows users to play against each other. Uses Socket.io for real-time communication.", usage: ["React JS", "SCSS", "NodeJS (Socket.io)"], image: "rps.webp", link: "https://github.com/yaboywf/multiplayer-rock-paper-scissors" },
    { title: "Chess Club Ranking System", description: "Simple CRUD website for administrators to manage chess club students. The focus point of this project was about real-world DEVOPS practices inclusive of team collaboration, testing and CI/CD. Diploma Assignment.", usage: ["HTML", "CSS", "JS", "Express JS"], image: "chess.png", link: "https://github.com/yaboywf/DEVOPS-Project" },
    { title: "TP VendPoint", description: "Website that allows administrators to manage vending machines. It includes multiple full sets of CRUD operations. Diploma Assignment.", usage: ["HTML", "CSS", "JavaScript", "Express JS", "MySQL"], image: "vendpoint.webp", link: "https://github.com/yaboywf/DBAV-Project" },
    { title: "ReFresh Deals", description: "ReFresh Deals is a mobile app that allows shop owners to post and manage food within their store. Expiring food can be posted to buyers at a discouted price, encouraging them to buy and thereby reducing food waste. Diploma Assignment", usage: ["Flutter", "Dart"], image: "refreshdeals.png", link: "https://github.com/yaboywf/MBAP-Project" },
    { title: "Portolio Website", description: "Hi! If you are seeing this, congrats! This website has gone through many iterations, transitioning from a simple UI design to what it is now today.", usage: ["React JS", "SCSS", "Firebase Authentication", "Cloudflare Workers"], image: "portfolio.png", link: "https://github.com/yaboywf/yaboywf.github.io" },
    { title: "Social Link Profile", description: "A card design that encompasses a profile picture, name, and social media links. Frontend Mentor challenge.", usage: ["HTML", "CSS"], image: "social.png", link: "https://github.com/yaboywf/social-links-profile" },
    { title: "Result Summary Component", description: "A card design that shows a summary of test results. Frontend Mentor challenge.", usage: ["HTML", "CSS"], image: "results.png", link: "https://github.com/yaboywf/results-summary-component" }
]

const ProjectGrid = ({ gridColumn, gridRow, data, onExpand }: ProjectGridProps) => {
    let ref!: HTMLDivElement;

    return (
        <div
            style={{
                ...(gridColumn && { "grid-column": gridColumn }),
                ...(gridRow && { "grid-row": gridRow })
            }}
            ref={ref}
            class={styles["project-grid"]}
            onClick={() => onExpand(ref, data)}
        >
            <p>{data.title}</p>
        </div>
    )
}

const MorphingCard = ({ expanded, onClose }: MorphingCardProps) => {
    let ref!: HTMLDivElement;
    const { rect, data } = expanded;

    onMount(() => {

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";

        requestAnimationFrame(() => ref.classList.add(styles.open));
    });

    const handleClose = () => {
        ref.classList.remove(styles.open);
        ref.classList.add("closing");
        ref.addEventListener("transitionend", () => onClose(), { once: true });
    };

    return (
        <div
            ref={ref}
            class={`${styles['project-grid']} ${styles['morphing-card']}`}
            style={{
                top: rect.top + "px",
                left: rect.left + "px",
                width: rect.width + "px",
                height: rect.height + "px"
            }}
            onClick={handleClose}
        >
            <div>
                <h1>{data.title}</h1>
                <span>{data.usage.join(" | ")}</span>
                <p>{data.description}</p>
                <Show when={data.link}>
                    <a href={data.link} target="_blank">View Project</a>
                </Show>
            </div>
            <div>
                <img src={data.image ? `/images/projects/${data.image}` : ""} alt="" />
            </div>
        </div>
    );
};

const Projects = () => {
    const [expanded, setExpanded] = createSignal<{ rect: DOMRect; data: Project } | null>(null);
    let originalElement: HTMLDivElement | null = null;

    const handleExpand = (el: HTMLDivElement, data: Project) => {
        const rect = el.getBoundingClientRect();
        el.classList.add(styles.hidden);
        originalElement = el;
        setExpanded({ rect, data });
    };

    const handleClose = () => {
        if (originalElement) originalElement.classList.remove(styles.hidden);
        document.body.style.overflow = "";
        setExpanded(null);
    };

    return (
        <section class={styles.projects}>
            <h2>Projects</h2>

            <div class={styles.grid}>
                <ProjectGrid data={projects[0]} onExpand={handleExpand} />
                <ProjectGrid data={projects[1]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" gridRow="span 2" data={projects[2]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" data={projects[3]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" gridRow="span 2" data={projects[4]} onExpand={handleExpand} />
                <ProjectGrid data={projects[5]} onExpand={handleExpand} />
                <ProjectGrid data={projects[6]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" data={projects[7]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" gridRow="span 2" data={projects[8]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" data={projects[9]} onExpand={handleExpand} />
                <ProjectGrid data={projects[10]} onExpand={handleExpand} />
                <ProjectGrid data={projects[11]} onExpand={handleExpand} />
            </div>

            <div
                class={styles.overlay}
                onClick={handleClose}
                style={{
                    opacity: expanded() ? "1" : "0",
                    "pointer-events": expanded() ? "all" : "none"
                }}>
            </div>

            <Show when={expanded()}>
                <MorphingCard expanded={expanded()!} onClose={handleClose} />
            </Show>
        </section>
    );
};

export default Projects;