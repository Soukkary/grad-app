import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [name, setName] = useState(localStorage.getItem('name') || "John Doe");
  const [email, setEmail] = useState(localStorage.getItem('email') || "johndoe@example.com");
  const [password, setPassword] = useState(localStorage.getItem('password') || "********");
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  const handleEditToggle = (field) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field],
    });
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    switch (field) {
      case 'name':
        setName(value);
        localStorage.setItem('name', value);
        break;
      case 'email':
        setEmail(value);
        localStorage.setItem('email', value);
        break;
      case 'password':
        setPassword(value);
        localStorage.setItem('password', value);
        break;
      default:
        break;
    }
  };

  const handleBlur = (field) => {
    setIsEditing({
      ...isEditing,
      [field]: false,
    });
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      handleBlur(field);
    }
  };

  useEffect(() => {
    // Focus input when editing starts
    for (const field in isEditing) {
      if (isEditing[field] && inputRefs[field].current) {
        inputRefs[field].current.focus();
      }
    }
  }, [isEditing]);

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <span className="text-xl font-bold">Account Details</span>
        </div>
        <div className="mb-4 flex items-center">
          <span className="w-1/3">Name:</span>
          <div className="w-2/3 flex items-center">
            {isEditing.name ? (
              <input 
                type="text" 
                value={name} 
                onChange={(e) => handleInputChange(e, 'name')}
                onBlur={() => handleBlur('name')}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                className="border rounded px-2 py-1 w-full"
                ref={inputRefs.name}
              />
            ) : (
              <span>{name}</span>
            )}
            <FontAwesomeIcon 
              icon={faPen} 
              className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
              onClick={() => handleEditToggle('name')}
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <span className="w-1/3">Email:</span>
          <div className="w-2/3 flex items-center">
            {isEditing.email ? (
              <input 
                type="text" 
                value={email} 
                onChange={(e) => handleInputChange(e, 'email')}
                onBlur={() => handleBlur('email')}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
                className="border rounded px-2 py-1 w-full"
                ref={inputRefs.email}
              />
            ) : (
              <span>{email}</span>
            )}
            <FontAwesomeIcon 
              icon={faPen} 
              className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
              onClick={() => handleEditToggle('email')}
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <span className="w-1/3">Password:</span>
          <div className="w-2/3 flex items-center">
            {isEditing.password ? (
              <input 
                type="password" 
                value={password} 
                onChange={(e) => handleInputChange(e, 'password')}
                onBlur={() => handleBlur('password')}
                onKeyDown={(e) => handleKeyDown(e, 'password')}
                className="border rounded px-2 py-1 w-full"
                ref={inputRefs.password}
              />
            ) : (
              <span>********</span>
            )}
            <FontAwesomeIcon 
              icon={faPen} 
              className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
              onClick={() => handleEditToggle('password')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
