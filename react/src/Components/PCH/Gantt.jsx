import React from 'react';
import { motion } from 'framer-motion';

const GanttChart = () => {
  return (
    <motion.div 
      className="p-4 bg-white rounded-lg shadow-md mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Gantt Chart</h2>
      <div className="bg-gray-200 p-4 rounded">
        <p className="text-gray-700">Gantt Chart will be displayed here</p>
      </div>
    </motion.div>
  );
};

export default GanttChart;
