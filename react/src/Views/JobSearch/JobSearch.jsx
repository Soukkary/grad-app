import React from "react";
import NavBar from "../JobSearch/NavBar/NavBar"
import Value from "../JobSearch/ValueDiv/Value";
import Search from "../JobSearch/SearchDiv/Search";
import Jobs from "../JobSearch/JobDiv/Jobs";
import Footer from "../JobSearch/FooterDiv/Footer";
import "../../jobsearch.css";

const JobSearch = () => {

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

  export default JobSearch
