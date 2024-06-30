import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Select,
    Input,
    Textarea,
    useToast,
    Heading,
    IconButton,
    Spinner,
    VStack,
    Text,
    HStack,
    useDisclosure,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
} from '@chakra-ui/react';
import JobCard from '../../Userdashboard/GigCard';
import axiosClient from "../../axios-client.js";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await axiosClient.get('/jobs');
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

  if (loading) {
    return <div className="flex items-center justify-center">
    <div className="text-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4 mt-20"></div>
      <h2 className="text-center text-xl font-semibold">Loading...</h2>
    </div>
  </div>
  }

  return (
    <div>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
            {projects.map((project) => (
                <JobCard key={project.id} job={project} />
            ))}
        </SimpleGrid>
    </div>
  );
};

export default Jobs;
