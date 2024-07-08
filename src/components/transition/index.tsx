import {motion, useAnimation, useInView} from "framer-motion";
import {useEffect, useRef} from "react";

type props = {
    children: React.ReactNode;
    id?: string;
};

const Transition = ({ children, id }: props) => {

    const variants = {
        hidden: { opacity: 0, translateX: -90 },
        visible: { opacity: 1, translateX: 0 },
    };

    const sectionTransition = {
        type: "spring",
        duration: 0.6,
        damping: 10,
        delay: 0.3,
        stiffness: 150,
    };

    const divTransition = {
        type: "spring",
        duration: 0.6,
        damping: 10,
        delay: 0.3,
        stiffness: 50,
    };

    const ref = useRef(null);
    const isInview = useInView(ref, {
        margin: "0px 100px -50px 0px"
    });
    const controls = useAnimation();

    useEffect(() => {
        if (isInview) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInview]);

    if (id != null) {
        return <motion.section
            id={id}
            ref={ref}
            variants={variants}
            transition={sectionTransition}
            initial="hidden"
            animate={controls}
        >
            {children}
        </motion.section>
    }

    return <motion.div
        ref={ref}
        variants={variants}
        transition={divTransition}
        initial="hidden"
        animate={controls}
    >
        {children}
    </motion.div>
}

export default Transition;