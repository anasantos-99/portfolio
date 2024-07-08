import "./index.css";
import React, {FC, useEffect, useState} from "react";
import Transition from "../transition";
import {Link} from "react-router-dom";
import {getDesignsFolder, getProjectInfo} from "../../utils/utils.tsx";
import {FaPalette} from "react-icons/fa";

interface DesignProps {
    designImages: string[][]
}

const Designs: FC<DesignProps> = ({ designImages }) => {

    const [designs, setDesigns] = useState<React.ReactNode>([]);
    useEffect(() => {
        async function loadDesigns() {
            const componentPromises = designImages.map(async imgs => {
                    let name = imgs[0].split("/")[2];
                    const design = await getProjectInfo(name, imgs);
                    return <div key={name} className="flex flex-col justify-center items-center">
                        <Transition>
                            <Link to={"/projects/" + name} state={{ design }}>
                                <h4>{design.title}</h4>
                                <h5>{design.technologies}</h5>
                                <div>
                                    <img src={getDesignsFolder() + name + '/' + design.mainImage} alt="" />
                                </div>
                            </Link>
                        </Transition>
                    </div>;
                }
            )

            Promise.all(componentPromises).then(setDesigns);
        }

        loadDesigns();
    }, [designImages]);

    return <React.Suspense fallback='Loading designs...'>
        <Transition id={"designs"}>
            <h3><FaPalette />Web Designs</h3>
            <div className="flex flex-row flex-wrap gap-8">{designs}</div>
        </Transition>
    </React.Suspense>;
}

export default Designs;