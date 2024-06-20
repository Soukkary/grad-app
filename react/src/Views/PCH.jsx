import React, { useState } from 'react';
import { motion } from 'framer-motion';


const StickyNavbar = () => {
  return (
    <div className="sticky top-0 bg-white shadow-md p-4">
      <h1 className="text-blue-500 text-xl">PCH</h1>
    </div>
  );
};

const Tabs = ({ onTabClick }) => {
  const tabs = ['Overview', 'Tasks', 'Timeline'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex flex-col space-y-4 border-r pr-4">
      {tabs.map((tab) => (
        <motion.div
          key={tab}
          className={`cursor-pointer py-2 ${activeTab === tab ? 'text-blue-500' : ''}`}
          onClick={() => {
            setActiveTab(tab);
            onTabClick(tab);
          }}
          whileHover={{ scale: 1.1 }}
        >
          {tab}
        </motion.div>
      ))}
    </div>
  );
};

const TabContent = ({ activeTab }) => {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 p-4"
    >
      <h2 className="text-lg mb-4">{activeTab} Content</h2>
      <p>
        Content for the {activeTab} tab goes here. Add more detailed information or components
        as needed.
      </p>
    </motion.div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <StickyNavbar />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 flex">
        <Tabs onTabClick={setActiveTab} />
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default App;
