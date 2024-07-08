import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Project from "./pages/Project.tsx";
import NoPage from "./pages/NoPage.tsx";
import {getImages} from "./utils/utils.tsx";

function App() {

    const loadProjectImages = import.meta.env.PROD ?
        import.meta.glob(['/dist/projects/*/*.png', '/dist/projects/*/*.gif'], { eager: true}) :
        import.meta.glob(['/public/projects/*/*.png', '/public/projects/*/*.gif'], { eager: true});
    let projectImages = getImages(loadProjectImages).reverse();

    const loadDesignImages = import.meta.env.PROD ?
        import.meta.glob(['/dist/designs/*/*.png', '/dist/designs/*/*.gif'], { eager: true}) :
        import.meta.glob(['/public/designs/*/*.png', '/public/designs/*/*.gif'], { eager: true});
    let designImages = getImages(loadDesignImages).reverse();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home projects={projectImages} designs={designImages} />} />
                <Route path="/projects/:id" element={<Project projects={projectImages} designs={designImages} />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    )
}

export default App
