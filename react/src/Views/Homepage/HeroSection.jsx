import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative bg-blue-900 text-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHdvcmt8ZW58MHx8fHwxNjU4NDQ4MzI0&ixlib=rb-1.2.1&q=80&w=1080)' }} />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <motion.h1 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Project Collab Hub
        </motion.h1>
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <input type="text" placeholder="Search for projects..." className="p-3 rounded-l-md w-64 text-black focus:ring-2 focus:ring-green-500"/>
          <button className="p-3 bg-green-500 hover:bg-green-700 rounded-r-md">Search</button>
        </motion.div>
        <motion.a href="/register" className="inline-block mt-8 px-8 py-4 bg-green-500 rounded-md text-lg font-semibold transition-transform transform hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Get Started
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
