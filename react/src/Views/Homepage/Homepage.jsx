// src/App.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { FaSearch, FaProjectDiagram, FaUserTie, FaComments, FaRobot } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(null);

  const tabs = [
    { name: 'Home', content: <div>Home Content</div> },
    { name: 'Marketplace', content: <div>Marketplace Content</div> },
    { name: 'Freelance', content: <div>Freelance Content</div> },
    { name: 'Project Hub', content: <div>Project Hub Content</div> },
    { name: 'Chatbot', content: <div>Chatbot Content</div> }
  ];

  const dummySubTabs = ['Overview', 'Pricing', 'Testimonials'];

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Blueprint</div>
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setSelectedTab(index)}
            onMouseLeave={() => setSelectedTab(null)}
          >
            <span className="cursor-pointer">{tab.name}</span>
            <AnimatePresence>
              {selectedTab === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-full mt-2 bg-gray-700 p-4 rounded-lg shadow-lg"
                >
                  <ul>
                    {dummySubTabs.map((subTab, subIndex) => (
                      <li key={subIndex} className="py-1">{subTab}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </nav>
  );
};
// src/components/HeroSection.jsx



const HeroSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/job-search?search=${searchQuery.trim()}`);
    }
  };

  return (
    <section className="relative bg-gray-800 text-white h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?freelance)' }}></div>
      <div className="relative z-10 text-center p-4">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="text-5xl font-bold mb-4 md:text-6xl"
        >
          Welcome to Blueprint
        </motion.h1>
        <motion.p 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, delay: 0.5 }} 
          className="text-xl mb-6 md:text-2xl"
        >
          Your hub for freelancing, collaboration, and growth.
        </motion.p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 1, delay: 1 }}
          className="w-full max-w-md mx-auto"
        >
          {!isExpanded ? (
            <motion.div
              className="text-4xl cursor-pointer"
              onClick={() => setIsExpanded(true)}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5 }}
            >
              <FaSearch />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1, scale: [0.8, 1] }}
              transition={{ duration: 0.5, bounce: 0.3 }}
              className="flex items-center"
            >
              <input 
                type="text" 
                placeholder="Search for projects, freelancers, etc..." 
                className="w-full p-4 rounded-full text-black outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                onBlur={() => setIsExpanded(false)}
              />
              <button onClick={handleSearch} className="p-4 bg-blue-500 text-white rounded-full ml-2">
                <FaSearch />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};




const Section = ({ title, description, image, icon: Icon, bgColor }) => (
  <section className={`py-20 ${bgColor}`}>
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      <motion.div 
        initial={{ x: -50, opacity: 0 }} 
        whileInView={{ x: 0, opacity: 1 }} 
        transition={{ duration: 1 }} 
        className="md:w-1/2 p-4"
      >
        <Icon className="text-6xl mb-4 text-blue-500" />
        <h2 className="text-4xl font-bold mb-4 md:text-5xl">{title}</h2>
        <p className="text-lg mb-6 md:text-xl">{description}</p>
      </motion.div>
      <motion.div 
        initial={{ x: 50, opacity: 0 }} 
        whileInView={{ x: 0, opacity: 1 }} 
        transition={{ duration: 1 }} 
        className="md:w-1/2 p-4"
      >
        <img src={image} alt={title} className="w-full rounded-lg shadow-lg" />
      </motion.div>
    </div>
  </section>
);

const MarketplaceSection = () => (
  <Section 
    title="Marketplace" 
    description="Find and hire top talent for your projects. Explore our marketplace of skilled freelancers." 
    image="https://source.unsplash.com/1600x900/?marketplace" 
    icon={FaProjectDiagram} 
    bgColor="bg-gray-100"
  />
);

const FreelanceSection = () => (
  <Section 
    title="Freelance" 
    description="Join our community of freelancers and start working on exciting projects." 
    image="https://source.unsplash.com/1600x900/?freelancer" 
    icon={FaUserTie} 
    bgColor="bg-white"
  />
);

const ProjectCollabHubSection = () => (
  <Section 
    title="Project Collaboration Hub" 
    description="Collaborate on projects with ease. Manage tasks, share files, and communicate with your team." 
    image="https://source.unsplash.com/1600x900/?collaboration" 
    icon={FaComments} 
    bgColor="bg-gray-200"
  />
);

const ChatbotSection = () => (
  <Section 
    title="Chatbot" 
    description="Get instant support and assistance with our AI-powered chatbot." 
    image="https://source.unsplash.com/1600x900/?chatbot" 
    icon={FaRobot} 
    bgColor="bg-white"
  />
);

const App = () => (
  <div>
    <Navbar />
    <HeroSection />
    <MarketplaceSection />
    <FreelanceSection />
    <ProjectCollabHubSection />
    <ChatbotSection />
  </div>
);

export default App;
