import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "./axios-client.js";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register() {
    const { setUser, setToken } = useStateContext();
    const nameRef = createRef();
    const emailRef = createRef();
    const roleRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            role: roleRef.current.value,
        };

        try {
            const { data } = await axiosClient.post('/register', payload);
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setSubmitted(true); 
            navigate('/profileform');
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        }
    };

    const shakeAnimation = {
        initial: { x: 0 },
        animate: { x: [0, -10, 10, -10, 10, 0] },
        transition: { duration: 0.5 },
    };

    if (submitted) {
        return (
            <div className="login-signup-form animated fadeInDown flex justify-center items-center min-h-screen">
                <div className="form w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-center text-xl font-semibold mb-4">Form Submitted Successfully!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="login-signup-form animated fadeInDown flex justify-center items-center min-h-screen">
            <div className="form w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <img className="mx-auto h-16" src="/blueprint2.png" alt="Logo" />
                <form onSubmit={onSubmit}>
                    <h1 className="text-center text-xl font-semibold mb-4">Signup</h1>

                    <div className="mb-4">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="fa fa-user"></i></span>
                            <motion.input 
                                ref={nameRef} 
                                type="text" 
                                placeholder="Full Name"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                {...(errors.name ? shakeAnimation : {})}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name[0]}</p>}
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="fa fa-envelope"></i></span>
                            <motion.input 
                                ref={emailRef} 
                                type="email" 
                                placeholder="Email Address"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                                {...(errors.email ? shakeAnimation : {})}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email[0]}</p>}
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="fa fa-lock"></i></span>
                            <motion.input 
                                ref={passwordRef} 
                                type="password" 
                                placeholder="Password"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                                {...(errors.password ? shakeAnimation : {})}
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password[0]}</p>}
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="fa fa-lock"></i></span>
                            <motion.input 
                                ref={passwordConfirmationRef} 
                                type="password" 
                                placeholder="Repeat Password"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password_confirmation ? 'border-red-500' : ''}`}
                                {...(errors.password_confirmation ? shakeAnimation : {})}
                            />
                        </div>
                        {errors.password_confirmation && <p className="text-red-500 text-xs italic">{errors.password_confirmation[0]}</p>}
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="fa fa-users"></i></span>
                            <motion.select 
                                id="role" 
                                name="role" 
                                required 
                                ref={roleRef}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.role ? 'border-red-500' : ''}`}
                                {...(errors.role ? shakeAnimation : {})}
                            >
                                <option value="">Select a role</option>
                                <option value="mgr">Project Manager</option>
                                <option value="dev">Developer</option>
                                <option value="usr">User</option>
                            </motion.select>
                        </div>
                        {errors.role && <p className="text-red-500 text-xs italic">{errors.role[0]}</p>}
                    </div>

                    <div className="mb-6">
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            Signup
                        </button>
                    </div>
                    <p className="text-center text-sm">
                        Already registered? <Link to="/login" className="text-blue-500 hover:text-blue-700">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
