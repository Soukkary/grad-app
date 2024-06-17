import React from "react";
import NavBar from "../JobSearch/NavBar/NavBar";
import Footer from "../JobSearch/FooterDiv/Footer";
import "../../jobsearch.css";
//Slider for image slides
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import react-icons
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { BsArrowRepeat } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
//import images
import google from "../../Assets/google.png";
import microsoft from "../../Assets/microsoft.jpeg";
import dell from "../../Assets/dell.jpeg";
import usa from "../../Assets/USA Flag.png";

const GigInfo = () => {

    return (
        <div className="w-[85%] m-auto bg-white">
            <NavBar/>
            {/*Main Section containing gig info*/}
            <div className="gig ml-20 mt-[-2rem] mb-10">
                <div className="container flex flex-row w-[1400px] py-7 gap-12">
                    <div className="left flex-2">
                        <div className="home flex items-center mt-2">
                            <AiOutlineHome className="mr-1 size-3.5"/>
                            <span className="divider mx-1 opacity-40">/</span>
                            <a href="#" className="hover:underline">Home</a>
                        </div>
                        <h1 className="mt-6 text-3xl font-semibold">Brief description of the gig</h1>
                        <div className="user flex items-center mt-4">
                            <img src={dell} alt="Profile Picture" className="w-12 h-12 rounded-full mr-3"/>
                            <span className="text-lg font-medium">Karim A.</span>
                            <div className="flex items-center ml-4">
                                <div className="flex items-center text-black-500">
                                    <IoIosStar width="16" height="16" fill="currentColor" className="mr-1"/>
                                    <span className="text-[16px] font-semibold mt-0.5">4.9</span>
                                </div>
                                <span className="ml-2 text-gray-500 text-sm mt-0.5">(68)</span>
                            </div>
                        </div>
                        <Slider slidesToShow={1} className="mt-5 w-[400px] h-auto cursor-move">
                            <img src={google} alt="Example Image"/>
                            <img src={microsoft} alt="Example Image"/>
                        </Slider>
                        <h2 className="mt-6 text-xl font-semibold">About This Gig</h2>
                        <p className="mt-2 text-gray-700">
                            Example:<br/>
                            Are you looking for a professional Figma designer to convert your design files? Look no further!
                            I offer high-quality Figma conversion services that are tailored to your specific needs.
                        </p>
                        <div className="freelancer mt-8">
                            <h2 className="text-xl font-semibold">About The Seller/Freelancer</h2>
                            <div className="user flex items-center mt-[-1.75rem]">
                                <img src={dell} alt="Profile Picture" className="w-[100px] h-[100px] rounded-full mr-3"/>
                                <div className="info ml-4 mt-[3.25rem]">
                                    <span className="block text-lg font-medium">Karim A.</span>
                                    <h5 className="block text-gray-500">UX/UI Designer</h5>
                                    <div className="mt-2 flex items-center">
                                        <div className="flex items-center text-black-500">
                                            <IoIosStar width="16" height="16" fill="currentColor" className="mr-1"/>
                                            <span className="text-[16px] font-semibold mt-0.5">4.9</span>
                                        </div>
                                        <span className="ml-2 text-gray-500 text-sm mt-0.5">(68)</span>
                                    </div>
                                    <button className="mt-4 px-4 py-2 bg-white text-black-500 border border-solid border-black rounded hover:bg-blue-600 hover:text-white">Contact me</button>
                                </div>
                            </div>
                            <div className="box mt-6 p-4 border rounded-lg">
                                <div className="items grid grid-cols-2 gap-4">
                                    <div className="item">
                                        <span className="title block font-light">From</span>
                                        <span className="desc block text-gray-500 font-semibold">USA</span>
                                    </div>
                                    <div className="item">
                                        <span className="title block font-light">Member since</span>
                                        <span className="desc block text-gray-500 font-semibold">Oct 2022</span>
                                    </div>
                                    <div className="item">
                                        <span className="title block font-light">Avg. response time</span>
                                        <span className="desc block text-gray-500 font-semibold">1 hour</span>
                                    </div>
                                    <div className="item">
                                        <span className="title block font-light">Last delivery</span>
                                        <span className="desc block text-gray-500 font-semibold">2 days</span>
                                    </div>
                                    <div className="item">
                                        <span className="title block font-light">Languages</span>
                                        <span className="desc block text-gray-500 font-semibold">English, Dutch</span>
                                    </div>
                                </div>
                                <hr className="my-4"/>
                                <p className="text-gray-700">
                                    Hello, my name is Leonidas and I am a skilled UX/UI designer with over 5 years of experience.
                                    I specialize in creating visually appealing, user-friendly, and responsive designs for websites, mobile apps, and other digital products.
                                </p>
                            </div>
                        </div>
                        <div className="reviews mt-8">
                            <h2 className="text-xl font-semibold">Reviews</h2>
                            <div className="item mt-4">
                                <div className="user flex items-center">
                                    <img src={dell} alt="Profile Picture" className="w-12 h-12 rounded-full mr-3"/>
                                    <div className="info ml-4">
                                        <span className="block text-lg font-medium">Karim A.</span>
                                        <div className="country flex items-center mt-1">
                                            <img src={usa} alt="Flag" className="w-6 h-4 mr-2"/>
                                            <span>United States</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center text-black-500">
                                    <IoIosStar width="16" height="16" fill="currentColor" className="mr-1"/>
                                    <span className="text-[16px] font-semibold mt-0.5">4.9</span>
                                </div>
                                <p className="mt-2 text-gray-700">
                                    Fantastic experience working with Karim.
                                    He helped us create a 1:1 copy of our e-commerce website in Figma
                                </p>
                                <div className="helpful mt-4">
                                    <span className="block font-medium">Helpful?</span>
                                    <div className="flex items-center text-black-500 cursor-pointer">
                                        <AiOutlineLike width="16" height="16" fill="currentColor" className="mr-1"/>
                                        <span className="mr-2">Yes</span>
                                        <AiOutlineDislike width="16" height="16" fill="currentColor" className="mr-1"/>
                                        <span>No</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4"/>
                            <div className="item mt-4">
                                <div className="user flex items-center">
                                    <img src={dell} alt="Profile Picture" className="w-12 h-12 rounded-full mr-3"/>
                                    <div className="info ml-4">
                                        <span className="block text-lg font-medium">Karim A.</span>
                                        <div className="country flex items-center mt-1">
                                            <img src={usa} alt="Flag" className="w-6 h-4 mr-2"/>
                                            <span>United States</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center text-black-500">
                                    <IoIosStar width="16" height="16" fill="currentColor" className="mr-1"/>
                                    <span className="text-[16px] font-semibold mt-0.5">4.9</span>
                                </div>
                                <p className="mt-2 text-gray-700">
                                    Fantastic experience working with Karim.
                                    He helped us create a 1:1 copy of our e-commerce website in Figma
                                </p>
                                <div className="helpful mt-4">
                                    <span className="block font-medium">Helpful?</span>
                                    <div className="flex items-center text-black-500 cursor-pointer">
                                        <AiOutlineLike width="16" height="16" fill="currentColor" className="mr-1"/>
                                        <span className="mr-2">Yes</span>
                                        <AiOutlineDislike width="16" height="16" fill="currentColor" className="mr-1"/>
                                        <span>No</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4"/>
                            <div className="item mt-4">
                                <div className="user flex items-center">
                                    <img src={dell} alt="Profile Picture" className="w-12 h-12 rounded-full mr-3"/>
                                    <div className="info ml-4">
                                        <span className="block text-lg font-medium">Karim A.</span>
                                        <div className="country flex items-center mt-1">
                                            <img src={usa} alt="Flag" className="w-6 h-4 mr-2"/>
                                            <span>United States</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center text-black-500">
                                    <IoIosStar width="16" height="16" fill="currentColor" className="mr-1"/>
                                    <span className="text-[16px] font-semibold mt-0.5">4.9</span>
                                </div>
                                <p className="mt-2 text-gray-700">
                                    Fantastic experience working with Karim.
                                    He helped us create a 1:1 copy of our e-commerce website in Figma
                                </p>
                                <div className="helpful mt-4">
                                    <span className="block font-medium">Helpful?</span>
                                    <div className="flex items-center text-black-500 cursor-pointer">
                                        <AiOutlineLike width="16" height="16" fill="currentColor" className="mr-1"/>
                                        <span className="mr-2">Yes</span>
                                        <AiOutlineDislike width="16" height="16" fill="currentColor" className="mr-1"/>
                                        <span>No</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4"/>
                        </div>
                        <button className="mt-4 px-4 py-2 font-medium bg-white text-black-500 border border-solid border-black rounded hover:bg-blue-600 hover:text-white">Show More Reviews</button>
                    </div>
                    <div className="right flex-1 p-6 border border-solid border-gray-300 rounded-lg shadow-md sticky top-10 self-auto flex-shrink-0 mr-[7.25rem] h-max">
                        <div className="price mb-4">
                            <h3 className="text-xl font-bold">Image To Figma</h3>
                            <h2 className="text-3xl font-bold">$80</h2>
                        </div>
                        <p className="mb-4 text-gray-700">
                            Save up to 15% with Subscribe to Save <br/>
                            Convert 1 web page - up to 4 sections
                        </p>
                        <div className="details mb-4 flex items-center gap-4">
                            <div className="item flex items-center mb-2 font-semibold">
                                <LuClock3 width="16" height="16" className="mr-2"/>
                                <span className="text-gray-600">2-day delivery</span>
                            </div>
                            <div className="item flex items-center mb-2 font-semibold">
                                <BsArrowRepeat width="16" height="16" className="mr-2"/>
                                <span className="text-gray-600">2 Revisions</span>
                            </div>
                        </div>
                        <div className="features mb-4">
                            <div className="item flex items-center mb-2">
                                <FaCheck width="16" height="16" fill="currentColor" className="mr-2"/>
                                <span className="opacity-50">1 page</span>
                            </div>
                            <div className="item flex items-center mb-2">
                                <FaCheck width="16" height="16" className="mr-2 opacity-20"/>
                                <span className="opacity-50">Prototype</span>
                            </div>
                            <div className="item flex items-center">
                                <FaCheck width="16" height="16" fill="currentColor" className="mr-2"/>
                                <span className="opacity-50">Source file</span>
                            </div>
                        </div>
                        <button className="w-full py-2 px-4 bg-black text-white font-semibold rounded hover:opacity-75">Continue</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
  }

  export default GigInfo
