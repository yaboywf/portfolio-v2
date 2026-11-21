import type { ProjectType, SelectedProject } from "./Project";
import type { Dispatch, StateUpdater } from "preact/hooks";
import styles from "./project.module.css";

const jxlImages = import.meta.glob("../../assets/projects/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?format=jxl",
    import: "default",
}) as Record<string, string>;

const webpImages = import.meta.glob("../../assets/projects/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?format=webp",
    import: "default",
}) as Record<string, string>;

export const getProjectImage = (filename: string, format: "jxl" | "webp") => {
    const images = format === "jxl" ? jxlImages : webpImages;
    return images[`../../assets/projects/${filename}`];
};

type Props = {
    gridColumn?: string;
    gridRow?: string;
    project: ProjectType;
    anchorName: string;
    selected: SelectedProject | null;
    setSelected: Dispatch<StateUpdater<SelectedProject | null>>;
};

const ProjectCard = ({ gridColumn, gridRow, project, anchorName, selected, setSelected }: Props) => {
    return (
        <button
            style={{
                anchorName,
                ...(gridColumn && { "grid-column": gridColumn }),
                ...(gridRow && { "grid-row": gridRow }),
                opacity: selected?.project.title === project.title ? "0" : "1",
            }}
            class={styles.project_card}
            onClick={() => {
                if (project.title === "View More Projects") window.open("https://github.com/yaboywf?tab=repositories", "_blank");
                else setSelected({ project, anchorName });
            }}
        >
            {project.image && (
                <picture>
                    <source srcSet={getProjectImage(project.image, "jxl")} type="image/jxl" />
                    <img className={styles.project_image_mobile} src={getProjectImage(project.image, "webp")} alt={project.title} loading="lazy" decoding="async" />
                </picture>
            )}

            <p>{project.title}</p>
        </button>
    );
};

export default ProjectCard;
