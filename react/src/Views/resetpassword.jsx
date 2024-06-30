import { useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosClient from "../Views/axios-client";

export default function ResetPassword() {
    const { token } = useParams();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');
    const emailRef = useRef();
    const passRef = useRef();
    const passConfirmRef = useRef();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            email: email || emailRef.current.value,
            password: passRef.current.value,
            password_confirmation: passConfirmRef.current.value,
            token,
        };
        setErrors({});
        try {
            const { data } = await axiosClient.post('/password/reset', payload);
            setMessage(data.message);
            setSuccess(true); // Set state to indicate success
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        }
    };

    // Conditional rendering based on success state
    if (success) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-center text-xl font-semibold mb-4">Password Reset Successful</h1>
                    <p className="text-green-500 text-xs italic">{message}</p>
                    <p className="text-center mt-4">
                        <a href="/login" className="text-blue-500 hover:text-blue-700">Go to Login</a>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-center text-xl font-semibold mb-4">Reset Password</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            defaultValue={email}
                            placeholder="Email"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                            readOnly={!!email}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email[0]}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            ref={passRef}
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password[0]}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
                            Confirm Password
                        </label>
                        <input
                            ref={passConfirmRef}
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password_confirmation ? 'border-red-500' : ''}`}
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-xs italic">{errors.password_confirmation[0]}</p>}
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                            Reset Password
                        </button>
                    </div>
                    {message && <p className="text-green-500 text-xs italic">{message}</p>}
                </form>
            </div>
        </div>
    );
}
