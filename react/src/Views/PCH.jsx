import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Divider,
  Stack,
  Flex,
  Text,
  Container,
  Avatar,
  Button,
  Textarea,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import axiosClient from './axios-client';
import Pusher from 'pusher-js';



const PCHPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState([]);
  const [projectmanager, setProjectManager] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Team Overview');
  const { isOpen, onOpen, onClose } = useDisclosure();
  




  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axiosClient.get(`projects/${projectId}`);
        setProject(response.data.projectname);
        setProjectManager(response.data.managerId);
        
        
        console.log(projectmanager);
        console.log(project);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  // Dummy data for now, replace it with the fetched data
  const teamMembers = [
    { name: 'Alice Smith', role: 'Project Manager', contact: 'alice@example.com' },
    { name: 'Bob Johnson', role: 'Developer', contact: 'bob@example.com' },
    // Add more team members as needed
  ];

  const tasks = [
    { description: 'Develop homepage', deadline: '2024-07-01', assignee: 'Bob Johnson' },
    // Add more tasks as needed
  ];

  const completedTasks = [
    { description: 'Setup project repository', completionDate: '2024-06-15', contributors: 'Alice Smith' },
    // Add more completed tasks as needed
  ];

  const projectGoals = [
    'Goal 1: Complete the project on time',
    'Goal 2: Maintain quality standards',
    // Add more goals as needed
  ];

  const documents = [
    { name: 'Project Plan', link: '/docs/project-plan.pdf' },
    // Add more documents as needed
  ];

  const handlePostUpdate = () => {
    // Handle posting update
  };

  const handleAddNote = () => {
    // Handle adding note
  };

  return (
    <>
      {/* Cool and Elegant Navbar */}
      <Container maxW="container.xl" p={8}>
        <motion.div
          initial={{ backdropFilter: 'blur(0px)' }}
          whileHover={{ backdropFilter: 'blur(8px)' }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backdropFilter: 'blur(0px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            backdropBlendMode: 'lighten',
          }}
        >
          <Box py={2}>
            <Container maxW="container.xl">
              <Flex justify="space-between" align="center">
                <Heading as="h2" size="md" color="blue.500">
                  {project}
                </Heading>
              </Flex>
            </Container>
          </Box>
        </motion.div>

        {/* Main Content */}
        <Flex ml={-260} mt={20} borderWidth="1px" borderRadius="md" boxShadow="lg" p={4} w="150vh" h="80vh">
          {/* Vertical Tabs */}
          <Tabs orientation="vertical" onChange={(index) => setSelectedTab(index)} flex={1}>
            <TabList marginTop={100}>
              <Tab>
                <Box>
                  Team Overview
                  <Divider mt={2} />
                </Box>
              </Tab>
              <Tab>
                <Box>
                  Task Management
                  <Divider mt={2} />
                </Box>
              </Tab>
              <Tab>
                <Box>
                  Completed Tasks
                  <Divider mt={2} />
                </Box>
              </Tab>
              <Tab>
                <Box>
                  Project Timeline
                  <Divider mt={2} />
                </Box>
              </Tab>
              <Tab>
                <Box>
                  Financial Tracking
                  <Divider mt={2} />
                </Box>
              </Tab>
              <Tab>
                <Box>
                  Project Goals
                  <Divider mt={2} />
                </Box>
              </Tab>
              <Tab>
                <Box>
                  Document Repository
                  <Divider mt={2} />
                </Box>
              </Tab>
              <Tab>
                <Box>
                  Progress Updates
                  <Divider mt={2} />
                </Box>
              </Tab>
              <Tab>
                <Box>
                  Manager's Notes
                  <Divider mt={2} />
                </Box>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Section title="Team Overview">
                  <TeamOverview projectId={projectId} onOpen={onOpen} />
                  <Stack spacing={4}>
                    {teamMembers.map((member, index) => (
                      <TeamMember key={index} member={member} />
                    ))}
                  </Stack>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Task Management">
                  <Stack spacing={4}>
                    {tasks.map((task, index) => (
                      <TaskItem key={index} task={task} />
                    ))}
                  </Stack>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Completed Tasks">
                  <Stack spacing={4}>
                    {completedTasks.map((task, index) => (
                      <Box key={index} p={4} shadow="md" borderWidth="1px">
                        <Text fontWeight="bold">{task.description}</Text>
                        <Text>Completion Date: {task.completionDate}</Text>
                        <Text>Contributors: {task.contributors}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Project Timeline">
                  <Box>
                    {/* Implement visual timeline or Gantt chart here */}
                    <Text>Project timeline will be displayed here.</Text>
                  </Box>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Financial Tracking">
                  <Box>
                    <Text>Project budget and expenses will be displayed here.</Text>
                  </Box>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Project Goals">
                  <Stack spacing={4}>
                    {projectGoals.map((goal, index) => (
                      <Box key={index} p={4} shadow="md" borderWidth="1px">
                        <Text>{goal}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Document Repository">
                  <Stack spacing={4}>
                    {documents.map((doc, index) => (
                      <Box key={index} p={4} shadow="md" borderWidth="1px">
                        <Text as="a" href={doc.link} color="blue.500">
                          {doc.name}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Progress Updates">
                  <Stack spacing={4}>
                    <Box>
                      <Textarea placeholder="Post an update..." />
                      <Button mt={2} colorScheme="blue" onClick={handlePostUpdate}>
                        Post Update
                      </Button>
                    </Box>
                    {/* Display past updates here */}
                  </Stack>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Manager's Notes">
                  <Stack spacing={4}>
                    <Box>
                      <Textarea placeholder="Add a note..." />
                      <Button mt={2} colorScheme="blue" onClick={handleAddNote}>
                        Add Note
                      </Button>
                    </Box>
                    {/* Display past notes here */}
                  </Stack>
                </Section>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Container>

      {/* Footer Section */}
      <Box mt={4} p={4} bg="gray.100" borderRadius="md">
        <Container maxW="container.xl">
          <Stack direction="row" spacing={8} align="center">
            <Box flex={1}>
              <Heading as="h3" size="md">
                Footer Content
              </Heading>
              <Text mt={2}>
                This is the footer section. Add your content here. You can include links,
                important notices, or any additional information.
              </Text>
              <Stack direction="row" spacing={4} mt={4}>
                <Button colorScheme="blue">Contact Us</Button>
                <Button colorScheme="blue">Privacy Policy</Button>
                {/* Add more buttons or links as needed */}
              </Stack>
            </Box>
            <Spacer />
            <Box>
              <Stack spacing={4}>
                <Text fontWeight="bold">Company Name</Text>
                <Text>Address: 123 Main Street, City, Country</Text>
                <Text>Email: info@example.com</Text>
                <Text>Phone: +1234567890</Text>
                {/* Add more company information */}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      <AddDeveloperModal isOpen={isOpen} onClose={onClose} projectId={projectId} projectmanager={projectmanager} />
    </>
  );
};

const Section = ({ title, children }) => (
  <Box>
    <Heading as="h2" size="lg" color="blue.500" mb={4}>
      {title}
    </Heading>
    <Divider mb={4} />
    {children}
  </Box>
);

const TeamMember = ({ member }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Flex key={member.name} align="center" p={2} borderRadius="md" _hover={{ bg: 'gray.100' }}>
        <Avatar name={member.name} />
        <Box ml={3}>
          <Text fontWeight="bold">{member.name}</Text>
          <Text>{member.role}</Text>
          <Text>{member.contact}</Text>
        </Box>
      </Flex>
    </motion.div>
  );
};

const TaskItem = ({ task }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Box key={task.description} p={4} shadow="md" borderWidth="1px" _hover={{ bg: 'gray.100' }}>
        <Text fontWeight="bold">{task.description}</Text>
        <Text>Deadline: {task.deadline}</Text>
        <Text>Assignee: {task.assignee}</Text>
      </Box>
    </motion.div>
  );
};

const TeamOverview = ({ projectId, onOpen }) => {
  return (
    <Box>
      <Heading as="h3" size="lg" mb={4}>Team Overview</Heading>
      <Button colorScheme="blue" onClick={onOpen}>Add Developer</Button>
    </Box>
  );
};

export default PCHPage;
// AddDeveloperModal.jsx

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  
  

  
  
  useToast
} from '@chakra-ui/react';
import NotificationListener from './NotificationListener';



const AddDeveloperModal = ({ isOpen, onClose, projectId,projectmanager }) => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  const toast = useToast();

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axiosClient.get('/DisplayUser');
        setDevelopers(response.data);
        console.log(developers);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    if (isOpen) {
      fetchDevelopers();
    }
  }, [isOpen]);

  const handleAddDeveloper = async (developerId) => {
    try {
      setLoading(true);
      
      await axiosClient.post(`/projects/${projectId}/add-developer-request`, {
         developer_id: developerId,
         managerId: projectmanager
        
        });
        // Set developerId and managerId in Redux store
        

        // Set notifListenerInitiator to true
        
      
      toast({
        title: 'Developer request sent.',
        description: 'The request has been sent to the developer.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error sending request:', error);
      toast({
        title: 'Error sending request.',
        description: 'There was an error sending the request.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Developer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {developers.map((developer) => (
            <Flex key={developer.id} align="center" mb={4}>
              <Avatar name={developer.name} src={developer.profile_picture} />
              <Box ml={3}>
                <Text fontWeight="bold">{developer.name}</Text>
                <Text>{developer.email}</Text>
              </Box>
              <Button
                ml="auto"
                colorScheme="blue"
                onClick={() => handleAddDeveloper(developer.id)}
                isLoading={loading}
              >
                Add
              </Button>
            </Flex>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


