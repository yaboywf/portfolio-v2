import { lenis } from "../Lenis/smooth-scroll";
import { getProjectImage } from "./ProjectCard";
import { useEffect, useRef, type Dispatch, type StateUpdater } from "preact/hooks";
import type { SelectedProject } from "./Project";
import styles from "./project.module.css";

type Props = {
    selected: SelectedProject;
    setSelected: Dispatch<StateUpdater<SelectedProject | null>>;
};

const ProjectDetail = ({ selected, setSelected }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        lenis?.stop();
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "10px";

        const frame = requestAnimationFrame(() => {
            element.classList.add(styles.open);
        });

        return () => {
            cancelAnimationFrame(frame);
            lenis?.start();
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, []);

    const handleClose = () => {
        const element = ref.current;
        if (!element) return;

        const onTransitionEnd = (event: TransitionEvent) => {
            if (event.target !== element || event.propertyName !== "width") {
                return;
            }

            element.removeEventListener("transitionend", onTransitionEnd);

            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            setSelected(null);
        };

        element.addEventListener("transitionend", onTransitionEnd);
        element.classList.remove(styles.open);
    };

    return (
        <div ref={ref} data-lenis-prevent class={`${styles.project_card} ${styles.project_detail}`} style={{ positionAnchor: selected.anchorName }}>
            <h1>{selected.project.title}</h1>
            <div className={styles.techstack}>
                {selected.project.usage.map((tech) => (
                    <span key={tech}>{tech}</span>
                ))}
            </div>
            <div className={styles.information}>
                <p>{selected.project.description}</p>
                {selected.project.image && (
                    <picture>
                        <source srcSet={getProjectImage(selected.project.image, "jxl")} type="image/jxl" />
                        <img src={getProjectImage(selected.project.image, "webp")} alt={selected.project.title} loading="lazy" decoding="async" />
                    </picture>
                )}
            </div>

            <div className={styles.links}>
                {selected.project.link && (
                    <button>
                        <a href={selected.project.link} target="_blank" aria-label="View Project">
                            <i className="fa-regular fa-arrow-up-right-from-square"></i>
                            <span>View Project</span>
                        </a>
                    </button>
                )}

                <button onClick={handleClose} type="button" aria-label="Close project details">
                    <i className="fa-regular fa-xmark" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
};

export default ProjectDetail;
