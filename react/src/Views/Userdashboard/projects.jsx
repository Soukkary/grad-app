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
  IconButton
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosClient from '../axios-client.js';
import Navbar from '../../Components/sidebar/sidebar.jsx';

const MotionBox = motion(Box);

import { useNavigate } from 'react-router-dom';

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const imgSrc = `${import.meta.env.VITE_API_BASE_URL}/images/${project.img}`;

  const handleCardClick = () => {
    navigate(`/project/PCH/${project.id}`);
  };

  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      bg="white"
      whileHover={{ scale: 1.05, boxShadow: 'lg' }}
      transition={{ duration: 0.2 }}
      cursor="pointer"
      onClick={handleCardClick}
    >
      <Image
        src={imgSrc}
        alt={project.img}
        boxSize="150px"
        objectFit="cover"
        mx="auto"
        mb={4}
      />
      <VStack spacing={4} align="start">
        <Text fontWeight="bold" fontSize="xl" textAlign="center" w="full">
          {project.project_name}
        </Text>
        <Text noOfLines={3} textAlign="center" w="full">
          {project.description}
        </Text>
      </VStack>
    </MotionBox>
  );
}

function ProjectForm({ isOpen, onClose, fetchProjects }) {
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
      const response = await axiosClient.post('/createproject', formData, {
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
          title: 'Project created.',
          description: 'Your project has been created successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        fetchProjects();
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="40%">
        <ModalHeader>Create A Project</ModalHeader>
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
                accept='images/*'
                onChange={(e) => setImg(e.target.files[0])}
              />
            </FormControl>
            <FormControl id="deadline" mb={4}>
              <FormLabel>Deadline</FormLabel>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                isClearable
                placeholderText="Select a deadline"
                customInput={<Input />}
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

function ProjectRequestsModal({ isOpen, onClose, requests, handleAcceptRequest, handleDeclineRequest }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Project Requests</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {requests.map((request) => (
            <Box key={request.id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
              <Text>{request.message}</Text>
              <Flex mt={2}>
                <Button
                  colorScheme="green"
                  onClick={() => handleAcceptRequest(request.project_id, request.developer_id)}
                  mr={2}
                >
                  Accept
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeclineRequest(request.project_id, request.developer_id)}
                >
                  Decline
                </Button>
              </Flex>
            </Box>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setuserId] = useState([]);
  const [projectId, setProjectId] = useState([]);
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isRequestsOpen, onOpen: onRequestsOpen, onClose: onRequestsClose } = useDisclosure();
  const toast = useToast();

  const fetchProjects = async () => {
    try {
      const response = await axiosClient.get('/user/projects');
      if (response.status >= 200 && response.status < 300) {
        setProjects(response.data.projects);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axiosClient.get('/user-requests');
      setRequests(response.data.requests);
      setuserId(response.data.userID)
      setProjectId(response.data.projectId)

    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleAcceptRequest = async (projectId, developerId) => {
    try {
      await axiosClient.post(`/projects/${projectId}/accept-developer-request`, { 
        developerId: developerId,
         projectId:projectId 
      });
      toast({
        title: 'Request Accepted',
        description: 'You have accepted the request.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      fetchRequests();
      fetchProjects();
    } catch (error) {
      console.error('Error accepting request:', error);
      toast({
        title: 'Error',
        description: 'There was an error accepting the request.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDeclineRequest = async (projectId, developerId) => {
    try {
      console.log('Project ID:', projectId);
      console.log('Developer ID:', developerId);
      await axiosClient.post(`/projects/${projectId}/${developerId}/decline-developer-request`, { 
        developerId: developerId,
         projectId: projectId });
      toast({
        title: 'Request Declined',
        description: 'You have declined the request.',
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
      fetchRequests();
    } catch (error) {
      console.error('Error declining request:', error);
      toast({
        title: 'Error',
        description: 'There was an error declining the request.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchRequests();
  }, []);

  return (
    <>
      <Box p={5}>
        <Navbar userId={userId}></Navbar>
        <Flex align="center" justify="space-between" mb={4} mt={12}>
          <Heading as="h2" size="2xl" ml={5} mt={5} mb={4}>
            Projects
          </Heading>
          <HStack>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={onCreateOpen}
            >
              Create a Project
            </Button>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={onRequestsOpen}
              ml={4}
            >
              View Requests
            </Button>
          </HStack>
        </Flex>
        <hr className="border-t-2 border-gray-900 my-4 w-full" />
        <Flex>
          <Box flex="3">
            {loading ? (
              <Flex justify="center" align="center" h="200px">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </SimpleGrid>
            )}
          </Box>
          <Box flex="1" ml={4}>
            <Heading as="h3" size="lg" mb={4}>
              Requests
            </Heading>
            {requests.length > 0 ? (
              requests.map((request) => (
                <Box key={request.id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                  <Text fontWeight="bold">{request.message}</Text>
                  <Flex mt={2}>
                    <Button
                      colorScheme="green"
                      onClick={() => handleAcceptRequest(request.project_id, request.developer_id)}
                      mr={2}
                    >
                      Accept
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeclineRequest(request.project_id, request.developer_id)}
                    >
                      Decline
                    </Button>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text>No new requests</Text>
            )}
          </Box>
        </Flex>
        <ProjectForm isOpen={isCreateOpen} onClose={onCreateClose} fetchProjects={fetchProjects} />
        <ProjectRequestsModal isOpen={isRequestsOpen} onClose={onRequestsClose} requests={requests} handleAcceptRequest={handleAcceptRequest} handleDeclineRequest={handleDeclineRequest} />
      </Box>
    </>
  );
}

export default Projects;
