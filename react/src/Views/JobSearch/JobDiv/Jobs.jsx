import React from "react";
import { Link } from "react-router-dom";
//Imported react icons
import { IoIosStar } from "react-icons/io";
//Imported images from src/assets
import giza from "../../../Assets/giza-systems.png"
import seimens from "../../../Assets/seimens.jpg";
import dell from "../../../Assets/dell.jpeg";
import google from "../../../Assets/google.png";
import microsoft from "../../../Assets/microsoft.jpeg";

//Storing jobs data in an array using Map function
const Data = [
  {
    id: 1,
    image: giza,
    freelancerImage: dell,
    gigLink: '/gig-info',
    freelancerName: 'Karim A.',
    desc: 'Web app for specific purposes',
    rating: 4.9,
    reviews: 68,
    price: 10
  },
  {
    id: 2,
    image: giza,
    freelancerImage: dell,
    gigLink: '/gig-info',
    freelancerName: 'Karim A.',
    desc: 'Web app for specific purposes',
    rating: 4.9,
    reviews: 68,
    price: 10
  },
  {
    id: 3,
    image: giza,
    freelancerImage: dell,
    gigLink: '/gig-info',
    freelancerName: 'Karim A.',
    desc: 'Web app for specific purposes',
    rating: 4.9,
    reviews: 68,
    price: 10
  },
  {
    id: 4,
    image: giza,
    freelancerImage: dell,
    gigLink: '/gig-info',
    freelancerName: 'Karim A.',
    desc: 'Web app for specific purposes',
    rating: 4.9,
    reviews: 68,
    price: 10
  },
  {
    id: 5,
    image: giza,
    freelancerImage: dell,
    gigLink: '/gig-info',
    freelancerName: 'Karim A.',
    desc: 'Web app for specific purposes',
    rating: 4.9,
    reviews: 68,
    price: 10
  },
  {
    id: 6,
    image: giza,
    freelancerImage: dell,
    gigLink: '/gig-info',
    freelancerName: 'Karim A.',
    desc: 'Web app for specific purposes',
    rating: 4.9,
    reviews: 68,
    price: 10
  },
  {
    id: 7,
    image: giza,
    freelancerImage: dell,
    gigLink: '/gig-info',
    freelancerName: 'Karim A.',
    desc: 'Web app for specific purposes',
    rating: 4.9,
    reviews: 68,
    price: 10
  },
  {
   id: 8,
    image: giza,
    freelancerImage: dell,
    gigLink: '/gig-info',
    freelancerName: 'Karim A.',
    desc: 'Web app for specific purposes',
    rating: 4.9,
    reviews: 68,
    price: 10
  },
]

const Jobs = () => {

  return (
    <div>
      <div className="jobContainer flex gap-10 justify-center flex-wrap items-center py-10">

        {
          Data.map(({ id, image, gigLink, freelancerImage, freelancerName, desc, rating, reviews, price }) => {
            return (
              //This will return a single job post based on the id
              <div key={id} className="basic-gig-card w-[310px] p-4 bg-white rounded-lg shadow-lg hover:bg-blue-50">
                  <a href={gigLink} target="_blank" rel="noopener noreferrer" aria-label="Go to gig" className="block relative">
                      <div className="slider first-slide relative">
                          <div className="slide-item active with-gradient" style={{ width: "auto" }}>
                              <img src={image} alt="Gig" className="w-full h-auto rounded-t-lg" />
                          </div>
                      </div>
                  </a>
                  <div className="flex-between flex items-center mt-4">
                      <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                              <img src={freelancerImage} alt={freelancerName} className="w-full h-full object-cover" />
                          </div>
                          <span className="ml-2 text-lg">{freelancerName}</span>
                      </div>
                  </div>
                  <Link to={gigLink} className="block mt-4 text-blue-600 font-light hover:underline" aria-label="Go to gig">
                      <p className="text-gray-800">{desc}</p>
                  </Link>
                  <div className="mt-2 flex items-center">
                      <div className="flex items-center text-black-500">
                          <IoIosStar width="16" height="16" fill="currentColor" className="mr-1"/>
                          <span className="text-[16px] font-semibold mt-0.5">{rating}</span>
                      </div>
                      <span className="ml-2 text-gray-500 text-sm mt-0.5">({reviews})</span>
                  </div>
                  <div className="mt-4 text-lg font-semibold text-gray-800">
                      From ${price}
                  </div>
              </div>

            )
          })
        }

      </div>
    </div>
  )
}

export default Jobs

