import React from "react";
import NavBar from "./NavBar/NavBar";
import Value from "./ValueDiv/Value";
import Search from "./SearchDiv/Search";
import Jobs from "./JobDiv/Jobs";
import Footer from "./FooterDiv/Footer";
import "../../jobsearch.css";

const GigSearch = () => {

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

  export default GigSearch
