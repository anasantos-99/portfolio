import './index.css';
import Transition from "../transition";
import {getDesignsFolder, getProjectsFolder, ProjectInfo} from "../../utils/utils.tsx";
import {FC} from "react";

interface ProjectDetailsProps {
    projID: string,
    project: ProjectInfo
}

const ProjectDetails: FC<ProjectDetailsProps> = ({ projID, project }) => {
    const isProject = projID[0] == 'p';
    const folder = (isProject ? getProjectsFolder() : getDesignsFolder()) + projID;

    return <div className="flex flex-col justify-center items-center">
        <Transition>
            <div className="flex flex-col align-center justify-center gap-10">
                <div className="lg:w-3/6 mx-auto">
                    <h4>{project.title}</h4>
                    <h5>{project.technologies}</h5>
                    {
                        isProject ?
                            (project.code ? <a href={project.code}>Code Repository</a> : <p>Code not available</p>) :
                        ''
                    }
                    {
                        project.preview ? <a href={project.preview}>Preview</a> : ''
                    }
                    <div className="mt-5 text-justify">
                        {
                            project.description.map((paragraph) => <p className="py-2">{paragraph}</p>)
                        }
                    </div>
                </div>
                <div className="main-img">
                </div>
            </div>
            <div className="w-fit mx-auto">
                <img src={ folder + '/' + project.mainImage } />
            </div>
            <div className="image-group flex flex-wrap gap-5 my-10">
                {
                    project.images.map(image => !image.includes(project.mainImage) ? <img className="" src={image} /> : '')
                }
            </div>
        </Transition>
    </div>
}

export default ProjectDetails;