import './index.css'
import {FaCss3, FaFileDownload, FaHtml5, FaJava, FaReact} from "react-icons/fa";
import {FaGolang} from "react-icons/fa6";
import {IoLogoJavascript} from "react-icons/io";
import {BiLogoSpringBoot} from "react-icons/bi";
import {RiFlutterFill} from "react-icons/ri";
import {useEffect, useRef, useState} from "react";
import Transition from "../transition";
import {useInView} from "framer-motion";

const Landing = () => {

    const ref = useRef(null);
    const isInview = useInView(ref, {
        margin: "0px 100px -50px 0px"
    });

    const originalText = ["Developer", "Engineer "];
    const [titleValue, setTitleValue] = useState(originalText[0]);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    function loadHeader(titleIndex: number) {
        setTimeout(() => {
            let iterations = 0;
            let interval = setInterval(() => {
                let currValue = titleValue.split("")
                    .map((_, index) => {
                        if (index < iterations) {
                            return originalText[titleIndex][index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    }).join("");

                setTitleValue(currValue);

                if (iterations >= originalText[titleIndex].length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        loadHeader(titleIndex == 0 ? 1 : 0);
                    }, 3000);
                }

                iterations += 1;
            }, 60);
        }, 200);
    }

    useEffect(() => {
        if (isInview) {
            loadHeader(0);
        }
    }, [isInview]);

    return <Transition id={"landing"}>
        <div className="flex flex-col justify-center items-center gap-8">
            <div className="about-me flex justify-center items-center">
                <div className="flex flex-col">
                    <h1>Hi, I'm Ana</h1>
                    <h2 ref={ref}>{titleValue}</h2>
                    <p>
                        I was never sure about what I wanted to do for a living.
                        When I started studying computer science, it finally clicked.
                        I am especially passionate about front-end development, as I have this persistent need to make
                        things look both functional and pleasing to the eye.
                        I also just love tinkering with different layouts.
                        Outside of curly brackets, I enjoy reading, writing and journaling, preferably with a nice cup of coffee by my side.
                    </p>
                </div>
                <img src="https://i.imgur.com/yjSGTf1.png" alt="" />
            </div>
            <ul className="w-full pt-3 lg:py-5 flex justify-center items-center">
                <li><FaJava /><span>Java</span></li>
                <li><FaGolang /><span>Go</span></li>
                <li><FaHtml5 /><span>HTML</span></li>
                <li><FaCss3 /><span>CSS</span></li>
                <li><IoLogoJavascript /><span>JavaScript</span></li>
                <li><BiLogoSpringBoot /><span>Spring Boot</span></li>
                <li><FaReact /><span>React</span></li>
                <li><RiFlutterFill /><span>Flutter</span></li>
            </ul>
            <button>
                <a className="flex flex-col justify-center items-center gap-2 text-sm font-extrabold" href="/CV%20-%20Ana%20Santos.pdf">
                    <FaFileDownload className="box-content rounded-3xl p-3 text-black text-lg" />
                    Resume
                </a>
            </button>
        </div>
    </Transition>;
}

export default Landing;