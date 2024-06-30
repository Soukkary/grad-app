import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const NavBar = () => {

    return (
        <div className="navBar flex justify-between items-center p-[3rem]">
            <div className="logoDiv">
                <Link to="/job-portal"><h1 className="logo text-[25px] text-blueColor"><strong>Job </strong> Search</h1></Link>
            </div>

            <div className="menu flex gap-8">
                <Link to="/job-portal"><li className="menuList text-[#6f6f6f] hover:text-blueColor">Jobs</li></Link>
                <li className="menuList text-[#6f6f6f] hover:text-blueColor">Companies</li>
                <li className="menuList text-[#6f6f6f] hover:text-blueColor">About</li>
                <li className="menuList text-[#6f6f6f] hover:text-blueColor">Contact</li>
                <li className="menuList text-[#6f6f6f] hover:text-blueColor">Blog</li>
            </div>
        </div>
    )
  }

  export default NavBar
