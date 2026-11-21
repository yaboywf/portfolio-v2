import { useState } from "preact/hooks";
import Contributions from "../Contribution/Contribution";
import Projects from "./project.json";
import styles from "./project.module.css";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";

export type ProjectType = {
    title: string;
    image: string;
    link?: string;
    usage: string[];
    description: string;
    rows?: string;
    columns?: string;
};

export type SelectedProject = {
    project: ProjectType;
    anchorName: string;
};

const Project = () => {
    const [selected, setSelected] = useState<SelectedProject | null>(null);

    return (
        <div class={styles.project_container}>
            <i className="fa-regular fa-diagram-project"></i>
            <h2>Projects</h2>

            <Contributions />

            <div class={styles.project_grid}>
                {Projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        selected={selected}
                        gridColumn={project.columns}
                        gridRow={project.rows}
                        setSelected={setSelected}
                        anchorName={`--project-${index}`}
                    />
                ))}
            </div>

            {selected && <div className={styles.overlay} />}

            {selected && <ProjectDetail selected={selected} setSelected={setSelected} />}
        </div>
    );
};

export default Project;
