import Navbar from "../components/navbar";
import Landing from "../components/landing";
import Projects from "../components/projects";
import Designs from "../components/designs";
import Contact from "../components/contact";
import {FC, useEffect} from "react";

interface HomeProps {
    projects: string[][],
    designs: string[][]
}

const Home: FC<HomeProps> = ({ projects, designs }) => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    return <>
        <Navbar />
        <Landing />
        <Projects projectImages={projects} />
        <Designs designImages={designs} />
        <Contact />
        <div id="footer" className="mx-auto">
            <p>Ana Santos © 2024</p>
            <a href="http://www.freepik.com">Illustration designed by catalyststuff / Freepik</a>
        </div>
    </>;
}

export default Home;