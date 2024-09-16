import { useRef, useState } from "react";
import axiosClient from "../Views/axios-client";

const ForgotPassword=()=> {
    const emailRef = useRef();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
        };
        setErrors({});
        axiosClient
            .post('/password/email', payload)
            .then(({ data }) => {
                setMessage(data.message);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-center text-xl font-semibold mb-4">Forgot Password</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email[0]}</p>}
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            Send Reset Link
                        </button>
                    </div>
                    {message && <p className="text-green-500 text-xs italic">{message}</p>}
                </form>
            </div>
        </div>
    );
}
export default ForgotPassword;