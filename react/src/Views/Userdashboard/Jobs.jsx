import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Components/sidebar/sidebar';
import axiosClient from "../axios-client.js";
import './card.css'



function JobForm({ onClose }) {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const descriptionRef = useRef(null);

  useEffect(() => {
   
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [description]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axiosClient.post('/createjob', {
        title,
        description,
        img,
      });
  
      // Assuming a successful response 
      if (response.status >= 200 && response.status < 300) {
        // Reset form fields
        setTitle('');
        setDescription('');
        // Close the form
        onClose();
      } else {
        throw new Error('Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      // Handle error as needed
    }
  };
  

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.content}>
          <button style={styles.closeBtn} onClick={onClose}>Close</button>
          <h2 style={styles.txt}>Post a Job</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.txt}>Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{...styles.input , ...styles.blueAccent}}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="description" style={styles.txt}>Description:</label>
              <textarea
                id="description"
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={styles.textarea}
              />

<label htmlFor="img">Select image:</label>
<input type="file" id="img" name="img" accept="image/*" value={img} onChange={(e) => setImg(e.target.value)}/>

            </div>
            <button type="submit" style={styles.submitBtn}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backdropFilter: 'blur(5px)',
  },
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '50px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  content: {
    maxWidth: '400px',
    width: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: 'black', // Add color property
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    resize: 'none',
    overflowY: 'hidden', // Hide vertical scrollbar
    color: 'black', // Add color property
  },

  submitBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  blueAccent: {
    border: '1px solid #007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
  },


  txt:{
    color:'black'
  }
  };





  function Jobs() {
    const [projects, setProjects] = useState([]);
    const [showJobForm, setShowJobForm] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch('/projects');
          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }
          const projectsData = await response.json();
          setProjects(projectsData);
          setLoading(false); // Set loading to false after data is fetched
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
          <h2 className='ml-5 mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white '>Jobs</h2>
          <hr className='border-t-2 border-gray-900 my-4 w-full mr-16 ' />
          {/* Button to toggle visibility of job form */}
         
          <button 
            className="btn btn-icon ml-auto -ml-12" 
            onClick={() => setShowJobForm(true)}
            aria-label="Post a job"
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
          {/* Conditional rendering of job form */}
          {showJobForm && <JobForm onClose={() => setShowJobForm(false)} />}
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
            <div className="flex items-center mt-4">
              <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
              </svg>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="grid mb-6">
            {projects.map(project => (
              <a 
                key={project.id} 
                href="#" 
                className="card card-clickable -ml-28" 
                style={{ textDecoration: 'none', width: '18rem' }}
              >
                <img src="//via.placeholder.com/286x180" alt="" />
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
              </a>

              
            ))}
            <div className="grid mb-6">
      <a href="#" className="card card-clickable" style={{ textDecoration: 'none', width: '18rem' }}>
        <img src="//via.placeholder.com/286x180" alt="" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          {}
        </div>
      </a>
    </div>
          </div>
          
        )}
      </>
    );
  } 

export default Jobs;
