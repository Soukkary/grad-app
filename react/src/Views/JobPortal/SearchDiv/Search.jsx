import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';

const Search = ({ onSearch }) => {
  const [jobSearch, setJobSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [levelSearch, setLevelSearch] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredJobs = jobs.filter(job => {
      // Filter by job title, company, and level
      const matchesJob = job.title.toLowerCase().includes(jobSearch.toLowerCase());
      const matchesCompany = job.orgName.toLowerCase().includes(companySearch.toLowerCase());
      const matchesLevel = job.level.toLowerCase().includes(levelSearch.toLowerCase());
      const matchesType = job.job_type.toLowerCase().includes(type.toLowerCase());
      return matchesJob && matchesCompany && matchesLevel && matchesType;
    });

    // Pass the sorted and filtered jobs to the parent component
    onSearch(filteredJobs);
  };

  const clearFilters = () => {
    setJobSearch('');
    setCompanySearch('');
    setLevelSearch('');
    setSortBy('');
    setType('');
    setLevel('');
    onSearch(jobs); // Reset to all jobs
  };

  return (
    <div className="searchDiv grid gap-10 bg-greyIsh rounded-[10px] p-[3rem]">
      <form onSubmit={handleSubmit}>
        <div className="firstDiv flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-greyIsh-700">
          <div className="flex gap-2 items-center">
            <AiOutlineSearch className="text-[25px] icon"/>
            <input
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
              placeholder="Search Job Here..."
              value={jobSearch}
              onChange={(e) => setJobSearch(e.target.value)}
            />
            <AiOutlineCloseCircle
              className="text-[30px] text-[#a5a6a6] hover:text-textColor icon cursor-pointer"
              onClick={() => setJobSearch('')}
            />
          </div>
          <div className="flex gap-2 items-center">
            <BsHouseDoor className="text-[25px] icon"/>
            <input
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
              placeholder="Search By Company..."
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
            />
            <AiOutlineCloseCircle
              className="text-[30px] text-[#a5a6a6] hover:text-textColor icon cursor-pointer"
              onClick={() => setCompanySearch('')}
            />
          </div>
          <div className="flex gap-2 items-center">
            <CiLocationOn className="text-[25px] icon"/>
            <input
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
              placeholder="Search By Level..."
              value={levelSearch}
              onChange={(e) => setLevelSearch(e.target.value)}
            />
            <AiOutlineCloseCircle
              className="text-[30px] text-[#a5a6a6] hover:text-textColor icon cursor-pointer"
              onClick={() => setLevelSearch('')}
            />
          </div>
          <button
            type="submit"
            className="bg-blueColor h-full p-5 px-10 rounded-[10px] text-white cursor-pointer hover:bg-blue-300"
          >
            Search
          </button>
        </div>
      </form>

      <div className="secDiv flex items-center gap-10 justify-center">
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="type" className="text-[#808080] font-semibold">Type: </label>
          <select
            name="type"
            id="type"
            className="bg-white rounded-[3px] px-4 py-1"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled selected>Choose Option</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Freelance">Freelance</option>
            <option value="Part-Time">Part-Time</option>
          </select>
        </div>
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="level" className="text-[#808080] font-semibold">Level: </label>
          <select
            name="level"
            id="level"
            className="bg-white rounded-[3px] px-4 py-1"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="" disabled selected>Choose Option</option>
            <option value="Fresh-graduate">Fresh-graduate</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <span className="text-[#a1a1a1] cursor-pointer" onClick={clearFilters}>Clear All</span>
      </div>
    </div>
  );
};

export default Search;
