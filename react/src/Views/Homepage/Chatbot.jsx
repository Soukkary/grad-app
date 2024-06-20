import React from 'react';
import { motion } from 'framer-motion';

const ChatbotSection = () => {
  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto text-center">
        <motion.h2 className="text-5xl font-bold mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          AI-Powered Chatbot
        </motion.h2>
        <motion.p className="text-xl max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our intelligent chatbot assists users with various tasks, including project management, finding freelancers, and answering FAQs. It's available 24/7 to provide support and enhance your experience on our platform.
        </motion.p>
        <motion.img src="https://images.unsplash.com/photo-1553456558-aff63285bddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNoYXRib3R8ZW58MHx8fHwxNjU4NDUxMDg3&ixlib=rb-1.2.1&q=80&w=800" alt="Chatbot Interaction" className="mx-auto rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default ChatbotSection;
