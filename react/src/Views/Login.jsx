import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../Views/axios-client";
import 'font-awesome/css/font-awesome.min.css';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import GoogleLoginButton from "../Components/GoogleLoginButton";

export default function Login() {

    const emailRef = useRef();
    const passRef = useRef();
    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passRef.current.value,
        }
        setErrors(null)   //To resit error messages
        axiosClient.post('/login', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status == 422) {    //422 means validation/processing error
                if(response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({
                        email: [response.data.message]
                    })
                }
            }
        })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <img className="image" src="/blueprint2.png" alt="Logo"/>
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login into your account
                    </h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                        <input ref={emailRef} type="email" name="email" placeholder="Email"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input ref={passRef} type="password" name="pass" placeholder="Password"/>
                    </div>
                    <button className="btn btn-block">Login</button>

                    <p className="message">
                        <Link to="#">Forgot Password?</Link>
                    </p>
                    <p className="message">
                        Not Registered? <Link to="/register">Create an account</Link>
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
    )
}
