import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Components/sidebar/sidebar';
import axiosClient from "../axios-client.js";
import './card.css'
import { motion } from 'framer-motion';
import JobCard from './GigCard';


function Projectform({ onClose }) {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState('');
  const descriptionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [description]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (img) {
      formData.append('img', img);
    }

    try {
      setLoading(true);
      const response = await axiosClient.post('/creategig', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setTitle('');
        setDescription('');
        setImg(null);
        onClose();
      } else {
        throw new Error('Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      setError('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.overlay}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-start backdrop-blur-lg"
    >
      <div style={styles.container} className="bg-white p-8 rounded-lg shadow-lg mt-10">
        <button style={styles.closeBtn} onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          Close
        </button>
        <h2 style={styles.txt} className="text-2xl font-bold mb-4">
          Create A Project
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              id="description"
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="img" className="block text-sm font-medium text-gray-700">
              Select image:
            </label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
              className="mt-1 block w-full"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

const styles = {
  overlay: {
    maxWidth: '100vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
  },
  closeBtn: {
    cursor: 'pointer',
  },
  txt: {
    color: 'black',
  },
};




function Projects() {
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosClient.get('/gigs');
        if (response.status >= 200 && response.status < 300) {
          setProjects(response.data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div><Navbar /></div>
      <div className='jobs-container flex items-center justify-between'>
        <h2 className='ml-5 mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Projects</h2>
        <hr className='border-t-2 border-gray-900 my-4 w-full mr-16' />
        <button
          className="btn btn-icon ml-auto -ml-12"
          onClick={() => setShowProjectForm(true)}
          aria-label="Create a Project"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        {showProjectForm && <Projectform onClose={() => setShowProjectForm(false)} />}
      </div>
      {loading ? (
        <div className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
            </svg>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="flex items-center mt-4 space-x-3">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM2 9a3 3 0 1 1 5.828 1H12.172A3.001 3.001 0 0 1 19 11v2a3.001 3.001 0 0 1-1 2.236v2.764a1 1 0 1 1-2 0V15H4v2.236a1 1 0 1 1-2 0v-2.764A3.001 3.001 0 0 1 1 13v-2a3.001 3.001 0 0 1 1-2.236V9Zm16-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM9.1 10H6.9c.069 0 .135-.014.2-.034V11h8V9.966c.065.02.131.034.2.034h2.2A2.1 2.1 0 0 0 19 8.9c0-1.152-.938-2.1-2.1-2.1h-6.8A2.1 2.1 0 0 0 8 8.9c0 1.162.938 2.1 2.1 2.1ZM2 11v2h16v-2H2Z"/>
            </svg>
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="jobs-grid-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          {projects.map((project) => (
            <JobCard key={project.id} job={project} />
          ))}
        </div>
      )}
    </>
  );
}

export default Projects;
