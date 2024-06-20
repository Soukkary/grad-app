import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ currentTab, setCurrentTab }) => {
  const tabs = ['Task Assignment', 'Team Assignment', 'Document Sharing', 'Gantt Chart'];

  return (
    <motion.div 
      className="w-64 h-screen bg-blue-500 text-white flex flex-col"
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold p-4">Project Hub</h2>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`p-4 text-left hover:bg-blue-400 ${currentTab === tab ? 'bg-blue-400' : ''}`}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </button>
      ))}
    </motion.div>
  );
};

export default Sidebar;
