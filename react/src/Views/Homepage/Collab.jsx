import React from 'react';
import { motion } from 'framer-motion';

const CollaborationSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <motion.h2 className="text-5xl font-bold mb-12 text-blue-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Project Collaboration Hub
        </motion.h2>
        <motion.p className="text-xl max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Collaborate efficiently with your team using our advanced tools. Share documents, track progress, and communicate in real-time to ensure your projects stay on track.
        </motion.p>
        <motion.img src="https://images.unsplash.com/photo-1527034106545-8ac537e61599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGNvbGxhYm9yYXRpb258ZW58MHx8fHwxNjU4NDUwOTU4&ixlib=rb-1.2.1&q=80&w=800" alt="Collaboration" className="mx-auto rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default CollaborationSection;
