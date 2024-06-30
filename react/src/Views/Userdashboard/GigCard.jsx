import React from 'react';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
  return (
    <motion.div
      className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-10  w-full"
      whileHover={{ scale: 1.05 }}
    >
      <img
        className="w-full h-48 object-cover"
        src={`${import.meta.env.VITE_API_BASE_URL}/images/${job.img}`}
        alt={job.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{job.title}</div>
        <p className="text-gray-700 text-base">{job.description}</p>
      </div>
    </motion.div>
  );
};

export default JobCard;
