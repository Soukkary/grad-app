import React from 'react';
import { motion } from 'framer-motion';

const ProjectInitiation = () => {
  return (
    <motion.div 
      className="p-4 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Initiate Project</h2>
      <input type="text" className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Project Name"/>
      <textarea className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Project Description"></textarea>
      <button className="w-full bg-blue-500 text-white py-2 rounded">Create Project</button>
    </motion.div>
  );
};

export default ProjectInitiation;
