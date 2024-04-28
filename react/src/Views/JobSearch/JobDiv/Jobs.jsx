import React from "react";
//Imported react icons
import { BiTimeFive } from "react-icons/bi";
//Imported images from src/assets
import giza from "../../../Assets/giza-systems.png";
import seimens from "../../../Assets/seimens.jpg";
import dell from "../../../Assets/dell.jpeg";
import google from "../../../Assets/google.png";
import microsoft from "../../../Assets/microsoft.jpeg";

//Storing jobs data in an array using Map function
const Data = [
  {
    id: 1,
    image: giza,
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: '2 years experience in Full-Stack development',
    company: 'Giza Systems'
  },
  {
    id: 2,
    image: seimens,
    title: 'Software Engineer',
    time: '14Hrs',
    location: 'Manchester',
    desc: '4 years experience in DevOps',
    company: 'Seimens'
  },
  {
    id: 3,
    image: dell,
    title: 'Software Tester',
    time: 'Now',
    location: 'NewYork',
    desc: '2 years experience in Software Testing',
    company: 'Dell Technology'
  },
  {
    id: 4,
    //image: logo3,
    title: 'Frontend Developer',
    time: '3Days',
    location: 'Cairo',
    desc: '2 years experience in Frontend Development',
    company: 'Dinamico Co.'
  },
  {
    id: 5,
    //image: logo3,
    title: 'Backend Developer',
    time: 'Now',
    location: 'Leeds',
    desc: '5 years experience in Backend Development',
    company: 'Cairo Tech'
  },
  {
    id: 6,
    //image: logo3,
    title: 'Full-Stack Developer',
    time: '10Hrs',
    location: 'Newcastle',
    desc: '2 years experience in Full-Stack Development',
    company: 'Software House Co.'
  },
  {
    id: 7,
    image: microsoft,
    title: 'Requirement Engineer',
    time: 'Now',
    location: 'Chicago',
    desc: '2 years experience in Requirement Analyis',
    company: 'Microsoft'
  },
  {
    id: 8,
    image: google,
    title: 'UI/UX Designer',
    time: '2Days',
    location: 'Berlin',
    desc: '2 years experience in UI/UX Designing',
    company: 'Google'
  },
]

const Jobs = () => {

    return (
        <div>
          <div className="jobContainer flex gap-20 justify-center flex-wrap items-center py-10">

            {
              Data.map(({id, image, title, time, location, desc, company}) => {
                return(
                  //This will return a single job post based on the id
                  <div key={id} className="group group/item singleJob w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyIsh-400/700 hover:shadow-lg">
                    <span className="flex justify-between items-center gap-4">
                      <h1 className="text-[16px] font-semibold text-textColor group-hover:text-white">{title}</h1>
                      <span className="flex items-center text-[#ccc] gap-1"><BiTimeFive/>{time}</span>
                    </span>
                    <h6 className="text-[#ccc]">{location}</h6>
                    <p className="text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white">
                      {desc}
                    </p>
                    <div className="company flex items-center gap-2">
                      <img src={image} alt="Company Logo" className="w-[20%]"/>
                      <span className="text-[14px] py-[1rem] block group-hover:text-white">{company}</span>
                    </div>
                    <button className="border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor group-hover:text-black">
                      Apply Now
                    </button>
                  </div>

                )
              })
            }

          </div>
        </div>
    )
  }

  export default Jobs
