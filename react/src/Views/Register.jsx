
import {Link} from "react-router-dom";
import {createRef} from "react";
import {useState} from "react";
import {useStateContext} from "../Contexts/ContextProvider.jsx";
import axiosClient from "./axios-client.js";
export default function Register(){
    const {setUser,setToken} = useStateContext()
    const nameRef = createRef()
    const emailRef = createRef()
    const roleRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const [errors,setErrors]= useState(null)

    const onSubmit=(ev)=>{
        ev.preventDefault()
        const payload ={
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            role: roleRef.current.value,

        }
        axiosClient.post('/register',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err =>{
            const response = err.response;
            if ( response && response.status== 422 ){
               console.log( response.data.errors);
               setErrors(response.data.errors)
            }
        })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
            {
                errors && <div className="alert">
                    {Object.keys(errors).map(key=>(
                        // eslint-disable-next-line react/jsx-key
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }

          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>

          <select id="role" name="role" required ref={roleRef}>
            <option value="">Select a role</option>
            <option value="mgr">Project Managr</option>
            <option value="dev">Developer</option>
            </select>

          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
        </div>
        </div>

      );
}
