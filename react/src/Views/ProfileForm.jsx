import { useState, useRef } from "react";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import axiosClient from "./axios-client.js";
import Avatar from "react-avatar"; // Import Avatar component
import axios from 'axios';
export default function ProfileForm() {
    const { setUser, setToken } = useStateContext();
    const educationRef = useRef(null);
    const experienceRef = useRef(null);
    const fileInputRef = useRef(null); // Reference to file input
    const [profilePic, setProfilePic] = useState(null); // State to store profile picture file
    const [errors, setErrors] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]); // State to store selected skills
    const [selectedFields, setSelectedFields] = useState([]); // State to store selected fields
    const [showAllFields, setShowAllFields] = useState(false); // State to toggle showing all fields
    const [showAllSkills, setShowAllSkills] = useState(false); // State to toggle showing all skills

    const fields = [
        "Web Development", "Mobile Development", "Data Science", "Machine Learning", "Game Development",
        "UI/UX Design", "Graphic Design", "Content Writing", "Digital Marketing", "SEO",
        "Project Management", "DevOps", "Cybersecurity", "Video Production", "Audio Production",
        "Animation", "3D Modeling", "Blockchain Development", "E-commerce Development", "IT Support",
        "Software Testing", "Business Analysis", "Network Administration", "System Administration",
        "Database Administration", "Cloud Computing", "Technical Writing", "Customer Support",
        "Sales & Marketing", "Social Media Management", "Legal Consulting", "Financial Consulting"
    ]; // Comprehensive list of freelance fields

    const skillsByField = {
        "Web Development": ["JavaScript", "React", "Node.js", "CSS", "HTML", "TypeScript", "Angular", "Vue.js", "Bootstrap", "Tailwind CSS"],
        "Mobile Development": ["Swift", "Kotlin", "React Native", "Flutter", "Java", "Objective-C", "Xamarin"],
        "Data Science": ["Python", "R", "SQL", "Machine Learning", "Data Analysis", "TensorFlow", "Pandas"],
        "Machine Learning": ["Python", "R", "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Data Analysis"],
        "Game Development": ["Unity", "Unreal Engine", "C#", "C++", "Blender", "Maya"],
        "UI/UX Design": ["Figma", "Adobe XD", "Sketch", "InVision", "Photoshop", "Illustrator"],
        "Graphic Design": ["Photoshop", "Illustrator", "InDesign", "After Effects", "Blender"],
        "Content Writing": ["Copywriting", "SEO", "Creative Writing", "Blog Writing"],
        "Digital Marketing": ["SEO", "Google Analytics", "Content Marketing", "Email Marketing"],
        "SEO": ["Google Analytics", "Keyword Research", "On-Page SEO", "Off-Page SEO"],
        "Project Management": ["Scrum", "Agile", "Kanban", "JIRA", "Asana"],
        "DevOps": ["Docker", "Kubernetes", "AWS", "Azure", "Jenkins"],
        "Cybersecurity": ["Penetration Testing", "Network Security", "Information Security"],
        "Video Production": ["Final Cut Pro", "Premiere Pro", "After Effects"],
        "Audio Production": ["Pro Tools", "Ableton Live", "FL Studio"],
        "Animation": ["Blender", "Maya", "After Effects"],
        "3D Modeling": ["Blender", "Maya", "ZBrush"],
        "Blockchain Development": ["Solidity", "Ethereum", "Hyperledger"],
        "E-commerce Development": ["Shopify", "WooCommerce", "Magento"],
        "IT Support": ["Technical Support", "Customer Support", "Help Desk"],
        "Software Testing": ["Selenium", "JUnit", "Cypress"],
        "Business Analysis": ["SQL", "Data Analysis", "Microsoft Excel"],
        "Network Administration": ["Cisco", "Network Security", "Firewall"],
        "System Administration": ["Linux", "Windows Server", "VMware"],
        "Database Administration": ["SQL", "Oracle", "PostgreSQL"],
        "Cloud Computing": ["AWS", "Azure", "GCP"],
        "Technical Writing": ["API Documentation", "Content Writing"],
        "Customer Support": ["Technical Support", "Help Desk"],
        "Sales & Marketing": ["CRM", "Salesforce", "Digital Marketing"],
        "Social Media Management": ["Facebook Ads", "Instagram Ads", "Twitter Marketing"],
        "Legal Consulting": ["Contract Law", "Corporate Law"],
        "Financial Consulting": ["Financial Analysis", "Accounting"]
    }; // Skills based on selected fields

    const handleFileClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleRemovePicture = () => {
        setProfilePic(null); // Remove the profile picture
    };

    const handleSkillChange = (skill) => {
        setSelectedSkills((prevSelectedSkills) =>
            prevSelectedSkills.includes(skill)
                ? prevSelectedSkills.filter((s) => s !== skill)
                : [...prevSelectedSkills, skill]
        );
    };

    const handleFieldChange = (field) => {
        setSelectedFields((prevSelectedFields) =>
            prevSelectedFields.includes(field)
                ? prevSelectedFields.filter((f) => f !== field)
                : [...prevSelectedFields, field]
        );
        setSelectedSkills([]); // Reset selected skills when fields change
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append("education", educationRef.current.value);
        formData.append("skills", selectedSkills.join(", "));
        formData.append("fields", selectedFields.join(", "));
        formData.append("experience", experienceRef.current.value);
        formData.append("profilepic", profilePic);
    
       try{ axiosClient
            .post('/createprofile', formData)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                ;
            })}
            catch(err) {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            };
    };
    

    const visibleFields = showAllFields ? fields : fields.slice(0, 5);
    const visibleSkills = selectedFields.flatMap(field => skillsByField[field] || []);
    const displaySkills = showAllSkills ? visibleSkills : visibleSkills.slice(0, 5);

    return (
        <div class="form flex justify-center items-center h-screen">
    <div class="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-y-auto max-h-[80vh]">
        <form onSubmit={onSubmit}>
            @csrf
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">Fields:</label>
                        <div className="flex flex-wrap gap-2">
                            {visibleFields.map(field => (
                                <label key={field} className={`px-3 py-1 border rounded-full cursor-pointer transition-all ${selectedFields.includes(field) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedFields.includes(field)}
                                        onChange={() => handleFieldChange(field)}
                                    />
                                    {field}
                                </label>
                            ))}
                        </div>
                        {fields.length > 5 && (
                            <button
                                type="button"
                                className="text-blue-500 mt-2"
                                onClick={() => setShowAllFields(!showAllFields)}
                            >
                                {showAllFields ? "- Show Less" : "+ Show More"}
                            </button>
                        )}
                    </div>
                    {selectedFields.length > 0 && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Skills:</label>
                            <div className="flex flex-wrap gap-2">
                                {displaySkills.map(skill => (
                                    <label key={skill} className={`px-3 py-1 border rounded-full cursor-pointer transition-all ${selectedSkills.includes(skill) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedSkills.includes(skill)}
                                            onChange={() => handleSkillChange(skill)}
                                        />
                                        {skill}
                                    </label>
                                ))}
                            </div>
                            {visibleSkills.length > 5 && (
                                <button
                                    type="button"
                                    className="text-blue-500 mt-2"
                                    onClick={() => setShowAllSkills(!showAllSkills)}
                                >
                                    {showAllSkills ? "- Show Less" : "+ Show More"}
                                </button>
                            )}
                        </div>
                    )}
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
