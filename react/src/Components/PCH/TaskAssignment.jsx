import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskAssignment = () => {
  const [members] = useState(['John Doe', 'Jane Smith', 'Alice Johnson']);
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedMember, setSelectedMember] = useState('');

  const handleAssignTask = (member) => {
    setSelectedMember(member);
  };

  const handleSubmit = () => {
    alert(`Task: ${task}, Deadline: ${deadline}, Assigned to: ${selectedMember}`);
    setTask('');
    setDeadline('');
    setSelectedMember('');
  };

  return (
    <motion.div 
      className="p-8 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Assign Tasks</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Project Members</h3>
          <ul>
            {members.map((member, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer border ${selectedMember === member ? 'bg-blue-200' : 'bg-gray-100'} mb-2 rounded`}
                onClick={() => handleAssignTask(member)}
              >
                {member}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Task Details</h3>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Task Name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded"
            onClick={handleSubmit}
            disabled={!task || !deadline || !selectedMember}
          >
            Assign Task
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskAssignment;
