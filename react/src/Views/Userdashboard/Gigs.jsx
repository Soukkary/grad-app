import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Heading,
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
  Image,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axiosClient from '../axios-client.js';
import Navbar from '../../Components/Navigbar';
import NotificationListener from '../../Views/NotificationListener';

const MotionBox = motion(Box);

function JobCard({ job }) {
  const imgSrc = `${import.meta.env.VITE_API_BASE_URL}/images/${job.img}`;
  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={0}
      bg="white"
      whileHover={{ scale: 1.05, boxShadow: 'lg' }}
      transition={{ duration: 0.2 }}
      cursor="pointer"
    >
      <Image
        src={imgSrc}
        alt={job.img}
        boxSize="250px"
        objectFit="fit"
        width='100%'
        
        mb={4}
      />
      <VStack spacing={4} align="start">
        <Text fontWeight="bold" fontSize="xl" textAlign="center" w="full">
          {job.title}
        </Text>
        <Text noOfLines={3} textAlign="center" w="full">
          {job.description}
        </Text>
      </VStack>
    </MotionBox>
  );
}

function JobForm({ isOpen, onClose, fetchJobs }) {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (deadline) {
      formData.append('end_date', deadline.toISOString());
    }
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
        setDeadline(null);
        onClose();
        toast({
          title: 'Job created.',
          description: 'Your job has been created successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        fetchJobs();
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="40%">
        <ModalHeader>Post a Gig</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            {error && <Text color="red.500" mb={4}>{error}</Text>}
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </FormControl>
            <FormControl id="img" mb={4}>
              <FormLabel>Select image</FormLabel>
              <Input
                type="file"
                accept="images/*"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              colorScheme="blue"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

function Gigs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const[userId,setuserId] = useState([]);
    // Example state management for developerId and managerId


  const fetchJobs = async () => {
    try {
      const response = await axiosClient.get('/usergigs');
      if (response.status >= 200 && response.status < 300) {
        setJobs(response.data.gigs);
        setuserId(response.data.userId);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    
    <>
    
    <Navbar userId={userId}></Navbar>
      <Box p={5}>
        
        <Flex align="center" justify="space-between" mb={4} mt={14}>
          <Heading as="h2" size="2xl" ml={5} mt={5} mb={4}>
            Gigs
          </Heading>
          <HStack>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={onOpen}
            >
              Post a Gig
            </Button>
          </HStack>
        </Flex>
        <hr className="border-t-2 border-gray-900 my-4 w-full" />
        {loading ? (
          <Flex justify="center" align="center" h="200px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </SimpleGrid>
        )}
        <JobForm isOpen={isOpen} onClose={onClose} fetchJobs={fetchJobs} />
      </Box>
      
    </>
    
  );
}

export default Gigs;
