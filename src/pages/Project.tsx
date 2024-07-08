import Navbar from "../components/navbar";
import {useLocation, useParams} from "react-router-dom";
import React, {FC, useEffect, useState} from "react";
import Transition from "../components/transition";
import {getProjectInfo, ProjectInfo} from "../utils/utils.tsx";
import ProjectDetails from "../components/project-details";

interface ProjectProps {
    projects: string[][],
    designs: string[][]
}

const Project: FC<ProjectProps> = ({ projects, designs }) => {
    const id = useParams();
    const location = useLocation();

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    const [data, setData] = useState<React.ReactNode>([]);
    useEffect(() => {
        async function loadProject() {
            let componentPromises;
            if (location.state != null) {
                const { project, design } = location.state;
                let array = [project, design];
                componentPromises = array.map(proj => { if (proj != null) return getComponent(proj); });
            } else {
                const isProject = id.id![0] == 'p';
                const dataImages: string[][] = isProject ? projects : designs;
                componentPromises = dataImages.map(async imgs => {
                        let name = imgs[0].split("/")[2];
                        if (id.id!.toString().includes(name)) {
                            const project = await getProjectInfo(name, imgs);
                            return getComponent(project);
                        }
                    }
                )
            }

            Promise.all(componentPromises).then(setData);
        }

        loadProject();
    }, [projects, designs]);

    function getComponent(project: ProjectInfo): JSX.Element {
        const projID = id.id!
        return <ProjectDetails projID={projID} project={project} />
    }

    return <>
        <Navbar />
        <React.Suspense fallback='Loading project...'>
            <Transition id={"project"}>
                {data}
            </Transition>
        </React.Suspense>
    </>
}

export default Project;