import "./index.css";
import {FaGears} from "react-icons/fa6";
import React, {FC, useEffect, useState} from "react";
import Transition from "../transition";
import {Link} from "react-router-dom";
import {getProjectInfo, getProjectsFolder} from "../../utils/utils.tsx";

interface ProjectProps {
    projectImages: string[][]
}

const Projects: FC<ProjectProps> = ({ projectImages }) => {

    const [projects, setProjects] = useState<React.ReactNode>([]);
    useEffect(() => {
        async function loadProjects() {
            const componentPromises = projectImages.map(async imgs => {
                    let name = imgs[0].split("/")[2];
                    const project = await getProjectInfo(name, imgs);
                    return <div key={name} className="flex flex-col justify-center items-center">
                        <Transition>
                            <Link to={"/projects/" + name} state={{ project }}>
                                <h4>{project.title}</h4>
                                <h5>{project.technologies}</h5>
                                <div>
                                    <img src={getProjectsFolder() + name + '/' + project.mainImage} alt="" />
                                </div>
                            </Link>
                        </Transition>
                    </div>;
                }
            )

            Promise.all(componentPromises).then(setProjects);
        }

        loadProjects();
    }, [projectImages]);

    return <React.Suspense fallback='Loading projects...'>
        <Transition id={"projects"}>
            <h3><FaGears />Projects</h3>
            <div className="flex flex-col justify-center items-center gap-10 lg:gap-20">{projects}</div>
        </Transition>
    </React.Suspense>;
}

export default Projects;