import React from "react";
import NavBar from "../JobPortal/NavBar/NavBar";
import Value from "../JobPortal/ValueDiv/Value";
import Search from "../JobPortal/SearchDiv/Search";
import Jobs from "../JobPortal/JobDiv/Jobs";
import Footer from "../JobPortal/FooterDiv/Footer";
import "../../jobsearch.css";

const JobPortal = () => {

    return (
        <div className="w-[85%] m-auto bg-white">
            <NavBar/>
            <Search/>
            <Jobs/>
            <Value/>
            <Footer/>
        </div>
    )
  }

  export default JobPortal
