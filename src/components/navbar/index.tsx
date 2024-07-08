import './index.css'
import {BsGithub, BsLinkedin} from "react-icons/bs";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

const Navbar = () => {
    const location = useLocation();

    const [activeSection, setActiveSection] = useState("");
    const observer = useRef(new IntersectionObserver((entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
        if (visibleSection) {
            setActiveSection(visibleSection.id);
        }
    }));
    useEffect(() => {
        const sections = document.querySelectorAll('section');

        sections.forEach((section) => {
            observer.current.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.current.unobserve(section);
            });
        };
    }, []);

    function clickActiveSection(this: Element) {
        setActiveSection(this.id);
    }

    function loadNavlinks() {
        if (location.pathname == '/') {
            return <>
                <a className={ activeSection == 'landing' ? 'active' : '' } href="#landing" onClick={clickActiveSection}><span>01.</span> About Me</a>
                <a className={ activeSection == 'projects' ? 'active' : '' } href="#projects" onClick={clickActiveSection}><span>02.</span> Projects</a>
                <a className={ activeSection == 'designs' ? 'active' : '' } href="#designs" onClick={clickActiveSection}><span>03.</span> Web Designs</a>
                <a className={ activeSection == 'contact' ? 'active' : '' } href="#contact" onClick={clickActiveSection}><span>04.</span> Contact</a>
            </>;
        } else {
            return <Link to="/" className="active">Home</Link>;
        }
    }

    return <>
        <div id="navlinks" className="fixed z-50 top-2 right-2 py-2 lg:py-3 px-5 lg:px-10 rounded-3xl">
            <div className="links flex justify-end align-center gap-3 lg:gap-10">
                { loadNavlinks() }
            </div>
        </div>
        <div id="navbar" className="fixed z-50 top-6 left-4 bottom-6 lg:top-10 lg:left-10 lg:bottom-10 gap-10 flex flex-col justify-start items-center">
            <div id="logo"><Link to="/">Ana</Link></div>
            <div className="divider"></div>
            <div className="socials flex flex-col gap-4 text-2xl">
                <a href="https://www.linkedin.com/in/ana-santos999/" aria-label="LinkedIn"><BsLinkedin /></a>
                <a href="https://github.com/anasantos-99/" aria-label="GitHub"><BsGithub /></a>
            </div>
        </div>
    </>;
}

export default Navbar