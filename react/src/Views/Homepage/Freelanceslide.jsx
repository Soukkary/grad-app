import React from 'react';
import { motion } from 'framer-motion';

const FreelancerSection = () => {
  const freelancers = [
    { name: 'Web Design', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHdlYiUyMGRlc2lnbnxlbnwwfHx8fDE2NTg0NDg2MzM&ixlib=rb-1.2.1&q=80&w=400' },
    { name: 'Graphic Design', image: 'https://images.unsplash.com/photo-1557682250-141d1c0e8f73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGdyYXBoaWMlMjBkZXNpZ258ZW58MHx8fHwxNjU4NDQ4NjM4&ixlib=rb-1.2.1&q=80&w=400' },
    { name: 'Digital Marketing', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8fHwxNjU4NDQ4NjQz&ixlib=rb-1.2.1&q=80&w=400' },
    { name: 'Software Development', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNvZnR3YXJlJTIwZGV2ZWxvcG1lbnR8ZW58MHx8fHwxNjU4NDQ4NjQ4&ixlib=rb-1.2.1&q=80&w=400' },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-blue-900">Freelancer Marketplace</h2>
        <motion.div className="flex overflow-x-scroll space-x-4 p-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {freelancers.map((freelancer, index) => (
            <motion.div key={index} className="flex-none w-80 h-80 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <img src={freelancer.image} alt={freelancer.name} className="w-full h-48 object-cover rounded-t-lg"/>
              <div className="p-4">
                <p className="text-2xl font-semibold text-blue-900">{freelancer.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FreelancerSection;
