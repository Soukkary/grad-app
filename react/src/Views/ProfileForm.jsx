import { useState, useRef } from "react";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "./axios-client.js";
import Avatar from "react-avatar"; // Import Avatar component

export default function ProfileForm() {
    const { setUser, setToken } = useStateContext();
    const educationRef = useRef(null);
    const skillsRef = useRef(null);
    const experienceRef = useRef(null);
    const fileInputRef = useRef(null); // Reference to file input
    const [profilePic, setProfilePic] = useState(null); // State to store profile picture file
    const [errors, setErrors] = useState(null);

    const handleFileClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleRemovePicture = () => {
        setProfilePic(null); // Remove the profile picture
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append("education", educationRef.current.value);
        formData.append("skills", skillsRef.current.value);
        formData.append("experience", experienceRef.current.value);
        formData.append("profilepic", profilePic); // Append profile picture file to FormData

        axiosClient
            .post('/register', formData)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown flex justify-center items-center">
            <div className="form w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={onSubmit}>
                    <div className="mb-4 flex justify-center relative">
                        <label htmlFor="profilepic" className="cursor-pointer">
                            <Avatar
                                name="profilepic"
                                size="100"
                                round="50%"
                                src={profilePic ? URL.createObjectURL(profilePic) : ""}
                                onClick={handleFileClick} // Make avatar clickable
                                className="transition-opacity duration-300 ease-in-out transform hover:opacity-50"
                            />
                            <input
                                type="file"
                                id="profilepic"
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden" // Hide the file input
                                onChange={(e) => setProfilePic(e.target.files[0])} // Update profile picture file
                            />
                            {profilePic && ( // Render remove icon if profile picture exists
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-gray-500 text-white rounded-full h-8 w-8 flex items-center justify-center"
                                    onClick={handleRemovePicture}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.707 6.293a1 1 0 011.414 0L10 8.586l2.879-2.88a1 1 0 111.414 1.414L11.414 10l2.88 2.879a1 1 0 11-1.414 1.414L10 11.414l-2.879 2.88a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            )}
                        </label>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="education" className="block text-gray-700 text-sm font-bold mb-2">Education:</label>
                        <input type="text" id="education" ref={educationRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">Skills:</label>
                        <input type="text" id="skills" ref={skillsRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">Experience:</label>
                        <input type="text" id="experience" ref={experienceRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
