import type { Dispatch, StateUpdater } from 'preact/hooks';
import type { ProjectType, SelectedProject } from './Project'
import styles from './project.module.css'

type Props = {
    gridColumn?: string;
    gridRow?: string;
    project: ProjectType;
    anchorName: string,
    selected: SelectedProject | null,
    setSelected: Dispatch<StateUpdater<SelectedProject | null>>
}

const ProjectCard = ({ gridColumn, gridRow, project, anchorName, selected, setSelected }: Props) => {
    return (
        <div
            style={{
                anchorName,
                ...(gridColumn && { "grid-column": gridColumn }),
                ...(gridRow && { "grid-row": gridRow }),
                opacity: selected?.project.title === project.title ? "0" : "1"
            }}
            class={styles.project_card}
            onClick={() => {
                if (project.title === "View More Projects") window.open("https://github.com/yaboywf?tab=repositories", "_blank")
                else setSelected({ project, anchorName })
            }}
        >
            {project.title !== "View More Projects" && <img
                className={styles.project_image_mobile}
                src={`/project/${project.image}`}
                alt={project.title}
                loading="lazy"
            />}
            <p>{project.title}</p>
        </div>
    )
}

export default ProjectCard