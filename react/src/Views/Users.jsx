import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosClient from "./axios-client.js";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosClient.get('/DisplayUser')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {users.map(user => (
          <motion.div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.05 }}
          >
            <img
              className="w-16 h-16 rounded-full mx-auto"
              src={user.profile_pic || '/default-avatar.png'}
              alt={user.name}
            />
            <h2 className="text-xl text-center mt-2">{user.name}</h2>
            <p className="text-center text-gray-500">{user.fields || 'No title'}</p>
            <Link
              to={`/profilepage/${user.id}`}
              className="block mt-4 text-center text-indigo-500 hover:underline"
            >
              View Profile
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Users;
