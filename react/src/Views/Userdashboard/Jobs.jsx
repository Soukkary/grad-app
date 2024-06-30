import React, { useState, useEffect, useRef } from 'react';
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
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import Navbar from '../../Components/sidebar/sidebar';
import axiosClient from "../axios-client.js";
import JobCard from './GigCard';

function JobForm({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [orgName, setOrgName] = useState('');
    const [level, setLevel] = useState('');
    const [job_type, setJobType] = useState('');
    const [img, setImg] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('orgName', orgName);
        formData.append('level', level);
        formData.append('job_type', job_type);
        if (img) {
            formData.append('img', img);
        }

        try {
            setLoading(true);
            const response = await axiosClient.post('/create-job', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });

            if (response.status >= 200 && response.status < 300) {
                setTitle('');
                setDescription('');
                setOrgName('');
                setLevel('');
                setJobType('');
                setImg(null);
                onClose();
                toast({
                    title: 'Job created.',
                    description: 'Your job has been created successfully.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
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
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent maxW="80%">
                <ModalHeader>Post a Job</ModalHeader>
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
                        <FormControl id="orgName" mb={4}>
                            <FormLabel>Organization Name</FormLabel>
                            <Input
                                type="text"
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                                required
                            />
                        </FormControl>

                        <FormControl id="level" mb={4}>
                            <FormLabel>Level</FormLabel>
                            <Select
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select level</option>
                                <option value="fresh-graduate">Fresh-graduate</option>
                                <option value="junior">Junior</option>
                                <option value="mid">Mid</option>
                                <option value="senior">Senior</option>
                                <option value="manager">Manager</option>
                            </Select>
                        </FormControl>
                        <FormControl id="job_type" mb={4}>
                            <FormLabel>Job Type</FormLabel>
                            <Select
                                value={job_type}
                                onChange={(e) => setJobType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="remote">Remote</option>
                                <option value="on-site">On-site</option>
                                <option value="freelance">Freelance</option>
                                <option value="part-time">Part-time</option>
                                <option value="full-time">Full-time</option>
                            </Select>
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
                                accept="image/*"
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

function Jobs() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    return (
        <>
            <Navbar />
            <Box p={5}>
                <Flex align="center" justify="space-between" mb={4}>
                    <Heading as="h2" size="2xl" ml={5} mt={5} mb={4}>
                        Jobs
                    </Heading>
                    <HStack>
                        <Button
                            leftIcon={<AddIcon />}
                            colorScheme="blue"
                            onClick={onOpen}
                        >
                            Post a Job
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
                        {projects.map((project) => (
                            <JobCard key={project.id} job={project} />
                        ))}
                    </SimpleGrid>
                )}
                <JobForm isOpen={isOpen} onClose={onClose} />
            </Box>
        </>
    );
}

export default Jobs;
