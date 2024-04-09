import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import {useStateContext} from "../Contexts/ContextProvider.jsx";
export default function Login(){
    const onSubmit=(ev)=>{
        ev.preventDefault()
    }
    const emailRef = createRef()
    const passwordRef = createRef()
    return(
        <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login</h1>
         
          
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          
          <button className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
        </form>
        </div>
        </div>
      
    
    );
}