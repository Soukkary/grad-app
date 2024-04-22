import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../Views/axios-client";
import '../index.css';

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
                        {/*<span className="input-group-addon"><i className="fa fa-envelope"></i></span>*/}
                        <input ref={emailRef} type="email" name="email" placeholder="Email"/>
                    </div>
                    <div className="input-group">
                        {/*<span className="input-group-addon"><i className="fa fa-lock"></i></span>*/}
                        <input ref={passRef} type="password" name="pass" placeholder="Password"/>
                    </div>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        <Link to="#">Forgot Password?</Link>
                    </p>
                    <p className="message">
                        Not Registered? <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
