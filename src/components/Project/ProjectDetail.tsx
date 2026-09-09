import { useEffect, useRef, type Dispatch, type StateUpdater } from "preact/hooks";
import type { SelectedProject } from "./Project";
import styles from './project.module.css'

type Props = {
    selected: SelectedProject;
    setSelected: Dispatch<StateUpdater<SelectedProject | null>>
}

const ProjectDetail = ({ selected, setSelected }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (!ref.current) return;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "10px";

        requestAnimationFrame(() => ref.current!.classList.add(styles.open));
    }, [selected]);

    const handleClose = () => {
        if (!ref.current) return

        ref.current.classList.remove(styles.open);
        ref.current.addEventListener("transitionend", () => {
            document.body.style.overflow = "";
            setSelected(null)
        }, { once: true });
    };

    return (
        <div
            ref={ref}
            class={`${styles.project_card} ${styles.project_detail}`}
            style={{ positionAnchor: selected.anchorName }}
        >
            <h1>{selected.project.title}</h1>
            <div className={styles.techstack}>
                {selected.project.usage.map(tech => (
                    <span>{tech}</span>
                ))}
            </div>
            <div className={styles.information}>
                <p>{selected.project.description}</p>
                <img src={selected.project.image ? `/project/${selected.project.image}` : ""} alt={selected.project.image} loading="lazy" />
            </div>

            <div className={styles.links}>
                {selected.project.link && <button>
                    <a href={selected.project.link} target="_blank" aria-label="View Project">
                        <i className="fa-regular fa-arrow-up-right-from-square"></i>
                        <span>View Project</span>
                    </a>
                </button>}
                
                <button onClick={handleClose}>
                    <i className="fa-regular fa-xmark"></i>
                </button>
            </div>
        </div>
    );
};

export default ProjectDetail