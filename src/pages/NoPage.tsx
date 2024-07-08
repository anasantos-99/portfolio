import Navbar from "../components/navbar";
import Transition from "../components/transition";

const NoPage = () => {
    return <>
        <Navbar />
        <Transition id="no-page">
            <div className="h-full flex align-center justify-center gap-40">
                <div className="flex flex-col align-center justify-center">
                    <h3>404</h3>
                    <h5>Page not found!</h5>
                    <p>Oops! Couldn't find the page you're looking for.</p>
                </div>
                <img className="w-1/6" src={"undraw_lost.svg"} alt="Not found" />
            </div>
        </Transition>
    </>;
}

export default NoPage;