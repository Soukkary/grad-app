import { Link, Navigate, redirect } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../Views/axios-client";
import 'font-awesome/css/font-awesome.min.css';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import GoogleLoginButton from "../Components/GoogleLoginButton";

export default function Login() {
    const emailRef = useRef();
    const passRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passRef.current.value,
        };
        setErrors(null); // To reset error messages
        axiosClient
            .post('/login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setIsLoggedIn(true); // Set login state to true upon successful login
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message]
                        });
                    }
                }
            });
            
    };
    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }
    return (
        
        <div className="login-signup-form animated fadeInDown flex justify-center items-centerß min-h-screen">
            <div className="form w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <img className="mx-auto h-16" src="/blueprint2.png" alt="Logo" />
                <form onSubmit={onSubmit}>
                    <h1 className="text-center text-xl font-semibold mb-4">Login into your account</h1>
                    {errors && (
                        <div className="mb-4">
                            {Object.keys(errors).map(key => (
                                <p key={key} className="text-red-500 text-xs italic">{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <div className="mb-4">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="fa fa-envelope"></i></span>
                            <input ref={emailRef} type="email" name="email" placeholder="Email"
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center">
                            <span className="mr-2"><i className="fa fa-lock"></i></span>
                            <input ref={passRef} type="password" name="pass" placeholder="Password"
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            Login
                        </button>
                    </div>
                    <p className="text-center text-sm">
                        <Link to="#" className="text-blue-500 hover:text-blue-700">Forgot Password?</Link>
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

                    <div className="social-login-buttons mt-4">
                        <GoogleLoginButton/>
                        <button
                            type="button"
                            onClick={() => window.location.href = '/auth/facebook'}
                            className="btn-facebook flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded-lg">
                            <FaFacebookF className="mr-2" /> Login with Facebook
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
