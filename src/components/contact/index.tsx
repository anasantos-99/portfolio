import "./index.css";
import {FaEnvelope} from "react-icons/fa";
import Transition from "../transition";
import {SubmitHandler, useForm} from "react-hook-form";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Inputs = {
    name: string,
    email: string,
    message: string
}

const Contact = () => {

    const showSuccessToast = () => {
        toast.success("Successfully sent e-mail", {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const showErrorToast = () => {
        toast.error("Something went wrong", {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<Inputs> = (_, e) => {
        e!.preventDefault();
        const formData = new FormData(e!.target);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                if (response.status == 200) {
                    showSuccessToast();
                } else {
                    console.log(response);
                    showErrorToast();
                }
            })
            .catch(error => {
                console.log(error);
                showErrorToast();
            })
            .then(function() {
                e!.target.reset();
            });
    };

    return <Transition id={"contact"}>
        <h3><FaEnvelope />Contact</h3>
        <div>
            <h4>E-mail</h4>
            <p>ana.pl.santos99@gmail.com</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action="https://api.web3forms.com/submit" method="POST" className="lg:w-2/6 mx-auto flex flex-col justify-center items-center gap-10">
            <input type="hidden" name="access_key" value="e9892ef1-c72f-4641-a605-14126d988b20" />
            <div>
                <label htmlFor="name">Your Name</label>
                <input {...register("name", { required: true, minLength: 3, maxLength: 50 })}
                       type="text" id="name" name="name" defaultValue="Your name" aria-invalid={errors.name ? "true" : "false"}  />
                {errors.name && errors.name.type === "required" && (
                    <span role="alert">A name is required</span>
                )}
                {errors.name && errors.name.type === "minLength" && (
                    <span role="alert">Name must be longer than 3 characters</span>
                )}
                {errors.name && errors.name.type === "maxLength" && (
                    <span role="alert">Max characters exceeded</span>
                )}
            </div>

            <div>
                <label htmlFor="name">Your E-mail</label>
                <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                       type="email" id="email" name="email" defaultValue="Your email" aria-invalid={errors.email ? "true" : "false"} />
                {errors.email && errors.email.type === "required" && (
                    <span role="alert">An e-mail is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                    <span role="alert">Invalid e-mail address</span>
                )}
            </div>

            <div>
                <label htmlFor="message">Message</label>
                <textarea {...register("message", { required: true, minLength: 15 })}
                          id="message" className="w-full min-h-56" name="message" defaultValue="Your message" aria-invalid={errors.message ? "true" : "false"}></textarea>
                {errors.message && errors.message.type === "required" && (
                    <span role="alert">A message is required</span>
                )}
                {errors.message && errors.message.type === "minLength" && (
                    <span role="alert">Message must be at least 15 characters</span>
                )}
            </div>

            <input type="submit" value="Submit" />
        </form>
        <ToastContainer />
        <script src="https://web3forms.com/client/script.js" async defer></script>
    </Transition>;
}

export default Contact;