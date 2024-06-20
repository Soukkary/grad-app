import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <motion.h2 className="text-5xl font-bold mb-12 text-blue-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About Our Platform
        </motion.h2>
        <motion.p className="text-xl max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our platform provides an integrated solution for managing freelance projects, collaborating with team members, and utilizing advanced AI tools. Whether you're a freelancer, project manager, or part of a larger organization, our platform offers the features you need to succeed.
        </motion.p>
        <motion.img src="https://images.unsplash.com/photo-1517411032315-e4d0d1a27066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fHdvcmwlMjBwbGFubmluZ3xlbnwwfHx8fDE2NTg0NTA2ODI&ixlib=rb-1.2.1&q=80&w=800" alt="About Our Platform" className="mx-auto rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default AboutSection;
