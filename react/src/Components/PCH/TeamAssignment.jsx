import React from 'react';
import { motion } from 'framer-motion';

const TeamAssignment = () => {
  return (
    <motion.div 
      className="p-4 bg-white rounded-lg shadow-md mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Assign Team</h2>
      <input type="text" className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Team Member"/>
      <button className="w-full bg-blue-500 text-white py-2 rounded">Add Team Member</button>
    </motion.div>
  );
};

export default TeamAssignment;
