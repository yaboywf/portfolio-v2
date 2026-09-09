import { useState } from 'preact/hooks'
import Projects from './project.json'
import styles from "./project.module.css";
import ProjectDetail from "./ProjectDetail";
import ProjectCard from "./ProjectCard"

export type ProjectType = {
    title: string,
    image: string,
    link?: string,
    usage: string[],
    description: string,
    rows?: string,
    columns?: string
}

export type SelectedProject = {
    project: ProjectType,
    anchorName: string
}

const Project = () => {
    const [selected, setSelected] = useState<SelectedProject | null>(null);

    return (
        <div class={styles.project_container}>
            <i className="fa-regular fa-diagram-project"></i>
            <h2>Projects</h2>

            <div class={styles.project_grid}>
                {Projects.map((project, index) => (
                    <ProjectCard project={project} selected={selected} gridColumn={project.columns} gridRow={project.rows} setSelected={setSelected} anchorName={`--project-${index}`} />
                ))}
            </div>

            {selected && <div className={styles.overlay} />}

            {selected && <ProjectDetail selected={selected} setSelected={setSelected} />}
        </div>
    );
};

export default Project;