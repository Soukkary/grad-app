import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosClient from './axios-client'; // Adjust the import path as necessary

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    initials: '',
    name: '',
    title: '',
    skills: [],
    experience: [],
  });
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(`Fetching user data for userId: ${userId}`);
        const response = await axiosClient.get(`/userprofile/${userId}`);
        console.log('Response data:', response.data);

        const skillsArray = Array.isArray(response.data.skills)
          ? response.data.skills
          : response.data.skills.split(',').map(skill => skill.trim());

        const experienceArray = Array.isArray(response.data.experience)
          ? response.data.experience
          : response.data.experience.split(',').map(exp => ({ title: exp, period: '', description: '' }));

        setUserData({
          ...response.data,
          skills: skillsArray,
          experience: experienceArray,
        });

        const gigsResponse = await axiosClient.get(`/usergigs/${userId}`);
        setGigs(gigsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">{error}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white w-full shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <i className="fas fa-user-circle mr-2"></i>Profile
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition duration-300">Home</a>
            <a href="#" className="hover:text-blue-400 transition duration-300">About</a>
            <a href="#" className="hover:text-blue-400 transition duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Banner and Profile Info */}
      <div className="relative bg-white shadow-lg">
        <img
          src="https://source.unsplash.com/random/1200x300"
          alt="Banner"
          className="w-full h-48 object-cover"
        />
        <div className="container mx-auto px-4 py-4 relative">
          <motion.div
            className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl absolute -top-16 left-1/2 transform -translate-x-1/2"
            whileHover={{ scale: 1.1 }}
          >
            {userData.initials}
          </motion.div>
          <div className="mt-20 text-center">
            <h1 className="text-3xl font-extrabold mb-2">{userData.name}</h1>
            <p className="text-lg text-gray-600">{userData.title}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row lg:space-x-8">
        {/* Skills and Experience */}
        <div className="w-full lg:w-1/3 lg:-ml-16 mb-8 lg:mb-0">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <motion.ul
              className="list-disc list-inside space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {userData.skills.map((skill, index) => (
                <motion.li key={index} className="text-lg bg-blue-100 p-2 rounded-md" whileHover={{ scale: 1.05 }}>
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              {userData.experience.map((job, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                  <p className="text-gray-600">{job.period}</p>
                  <p>{job.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Gigs */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Gigs</h2>
            <div className="space-y-6">
              {gigs.map((gig, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="font-semibold text-xl mb-2">{gig.title}</h3>
                  <p className="text-gray-600">{gig.period}</p>
                  <p>{gig.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
