import { Link, Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../Views/axios-client";
import 'font-awesome/css/font-awesome.min.css';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Login() {
    const emailRef = useRef();
    const passRef = useRef();
    const [errors, setErrors] = useState({});
    const { token, setToken } = useStateContext();
    const { user, setUser } = useStateContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passRef.current.value,
        };
        setErrors({});
        axiosClient
            .post('/login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setIsLoggedIn(true);
                
            })
            .catch(err => {
                const response = err.response;
                if (response) {
                    if (response.status === 401) {
                        setErrors({ email: response.data.message });
                    } else if (response.status === 402) {
                        setErrors({ password: response.data.message });
                    } else if (response.status === 422) {
                        setErrors(response.data.errors);
                    }
                }
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="login-signup-form animated fadeInDown flex justify-center items-center min-h-screen">
            <div className="form w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <img className="mx-auto h-16" src="/blueprint2.png" alt="Logo" />
                <form onSubmit={onSubmit}>
                    <h1 className="text-center text-xl font-semibold mb-4">Login into your account</h1>
                    <div className="mb-4">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="   -ml-1  fa fa-envelope"></i></span>
                            <motion.input
                                ref={emailRef}
                                type="email"
                                name="email"
                                placeholder="Email"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                                animate={errors.email ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="fa fa-lock"></i></span>
                            <motion.input
                                ref={passRef}
                                type="password"
                                name="pass"
                                placeholder="Password"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                                animate={errors.password ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-6">
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            Login
                        </button>
                    </div>
                    <p className="text-center text-sm">
                        <Link to="/forget-password" className="text-blue-500 hover:text-blue-700">Forgot Password?</Link>
                    </p>
                    <p className="text-center text-sm mt-4">
                        Not Registered? <Link to="/register" className="text-blue-500 hover:text-blue-700">Create an account</Link>
                    </p>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                   { /*<div className="social-login-buttons mt-4">
                        {loginUrl != null && (
                            <button
                                type="button"
                                onClick={() => window.location.href = loginUrl}
                                className="btn-google flex items-center justify-center w-full py-2 bg-red-600 text-white rounded-lg">
                                <FaGoogle className="mr-2" /> Login with Google
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => window.location.href = '/auth/facebook'}
                            className="btn-facebook flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded-lg">
                            <FaFacebookF className="mr-2" /> Login with Facebook
                        </button>
                    </div>
                   */ }

                </form>
            </div>
        </div>
    );
}
