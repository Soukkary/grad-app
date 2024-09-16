import React from 'react';
import { motion } from 'framer-motion';

const DocumentSharing = () => {
  return (
    <motion.div 
      className="p-4 bg-white rounded-lg shadow-md mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Share Documents</h2>
      <input type="file" className="w-full p-2 border border-gray-300 rounded mb-4" />
      <button className="w-full bg-blue-500 text-white py-2 rounded">Upload Document</button>
    </motion.div>
  );
};

export default DocumentSharing;
