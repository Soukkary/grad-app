import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Divider,
  Stack,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Container,
  Avatar,
  Button,
  Textarea,
  IconButton,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import axiosClient from './axios-client';
import Pusher from 'pusher-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PCHPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState([]);
  const [projectmanager, setProjectManager] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Team Overview');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [assignmentFields, setAssignmentFields] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [taskDescription, setTaskDescription] = useState(null);
  const[livetask,setlivetask]=useState([]);
  const [completedTasks, setcompletedTasks] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axiosClient.get(`/project/PCH/${projectId}/team`);
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, [projectId]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axiosClient.get(`projects/${projectId}`);
        setProject(response.data.projectname);
        setProjectManager(response.data.managerId);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosClient.get(`/projects/${projectId}/tasks`);
        const pendingTasks = response.data.filter(task => task.status === 'pending');
        const donetasks = response.data.filter(task => task.status !== 'pending');
        setTasks(pendingTasks);
        setcompletedTasks(donetasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [projectId]);
  useEffect(() => {
  const pusher = new Pusher('8a351db698a9f6549807', {
    cluster: 'mt1',
    encrypted: true,
  });

  const channel = pusher.subscribe(`project.${projectId}`);
  channel.bind('App\\Events\\TaskEvent', (data) => {
    setlivetask((prevTasks) => [
      ...prevTasks,
      {
        id: data.taskId,
        description: data.description,
        due_date: data.dueDate,
        users: data.userName.map((name, index) => ({ id: data.userId[index], name })),
      },
    ]);
  });
  console.log(livetask);

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
    pusher.disconnect();
  };
}, [projectId]);
    

  



  const projectGoals = [
    'Goal 1: Complete the project on time',
    'Goal 2: Maintain quality standards',
  ];

  const documents = [
    { name: 'Project Plan', link: '/docs/project-plan.pdf' },
  ];

  const handlePostUpdate = () => {
    // Handle posting update
  };

  const handleAddNote = () => {
    // Handle adding note
  };

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const addAssignmentField = () => {
    setAssignmentFields([...assignmentFields, {}]);
  };

  const handleAssignmentChange = (index, value) => {
    const updatedFields = [...assignmentFields];
    updatedFields[index] = value;
    setAssignmentFields(updatedFields);
  };

  const handleRemoveAssignment = (index) => {
    const updatedFields = [...assignmentFields];
    updatedFields.splice(index, 1);
    setAssignmentFields(updatedFields);
  };

  const createTask = async () => {
    try {
      console.log(deadline);
      const taskData = {
        description: taskDescription,
        dueDate: deadline.toISOString(),
        user_id: assignmentFields, // Collecting user IDs from the assignment fields
        project_id: projectId,
      };

      const response = await axiosClient.post(`/projects/${projectId}/tasks`, taskData);
     
    
      console.log('Task created:', response.data);
      

        
        closeTaskModal()
        

      ; // Close modal after successful creation
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  
  return (
    <>
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

        <Flex ml={-260} mt={20} borderWidth="1px" borderRadius="md" boxShadow="lg" p={4} w="150vh" h="80vh">
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
                  <Button colorScheme="blue" onClick={openTaskModal}>
                    Create Task
                  </Button>
                  <Stack spacing={4}>
                    {tasks.map((task, index) => (
                      <TaskItem key={index} task={task} />
                    ))}
                  </Stack>
                  {
                  <Stack spacing={4}>
                    {livetask.map((task, index) => (
                      <TaskItem key={index} task={task} />
                    ))}
                  </Stack>
}
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Completed Tasks">
                <Stack spacing={4}>
                    {completedTasks.map((task, index) => (
                      <TaskItem key={index} task={task} />
                    ))}
                  </Stack>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Project Timeline">
                  <Text>Timeline content goes here...</Text>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Financial Tracking">
                  <Text>Financial tracking content goes here...</Text>
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
                        <Text>
                          <a href={doc.link} target="_blank" rel="noopener noreferrer">
                            {doc.name}
                          </a>
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Progress Updates">
                  <Textarea placeholder="Post an update..." />
                  <Button mt={2} colorScheme="blue" onClick={handlePostUpdate}>
                    Post Update
                  </Button>
                </Section>
              </TabPanel>

              <TabPanel>
                <Section title="Manager's Notes">
                  <Textarea placeholder="Add a note..." />
                  <Button mt={2} colorScheme="blue" onClick={handleAddNote}>
                    Add Note
                  </Button>
                </Section>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>

        <Modal isOpen={isTaskModalOpen} onClose={closeTaskModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="taskDescription">
                <FormLabel>Task Description</FormLabel>
                <Textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </FormControl>

              <FormControl id="taskDeadline" mt={4}>
                <FormLabel>Deadline</FormLabel>
                <DatePicker
                  selected={deadline}
                  onChange={(date) => setDeadline(date)}
                  showTimeSelect
                  dateFormat="Pp"
                />
              </FormControl>

              <FormControl id="taskAssignment" mt={4}>
                <FormLabel>Assign to Team Members</FormLabel>
                {assignmentFields.map((field, index) => (
                  <Flex key={index} mb={2}>
                    <Select
                      placeholder="Select team member"
                      value={field.value}
                      onChange={(e) => handleAssignmentChange(index, e.target.value)}
                    >
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </Select>
                    <IconButton
                      aria-label="Remove assignment"
                      icon={<MinusIcon />}
                      ml={2}
                      onClick={() => handleRemoveAssignment(index)}
                    />
                  </Flex>
                ))}
                <Button mt={2} colorScheme="blue" onClick={addAssignmentField}>
                  Add Assignment
                </Button>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={createTask}>
                Create Task
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
      <AddDeveloperModal isOpen={isOpen} onClose={onClose} projectId={projectId} projectmanager={projectmanager} />
    </>
  );
};

const Section = ({ title, children }) => (
  <Box mt={8}>
    <Heading as="h3" size="lg" mb={4}>
      {title}
    </Heading>
    {children}
  </Box>
);

const TeamOverview = ({ projectId, onOpen }) => {
  const [projectManager, setProjectManager] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  

  return (
    <Stack spacing={4}>
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontWeight="bold">Project Manager: {projectManager}</Text>
        <Button mt={2} colorScheme="blue" onClick={onOpen}>
          Add Member
        </Button>
      </Box>
      {teamMembers.map((member, index) => (
        <TeamMember key={index} member={member} />
      ))}
    </Stack>
  );
};

const TeamMember = ({ member }) => (
  <Box p={4} shadow="md" borderWidth="1px">
    <Flex align="center">
      <Avatar name={member.name} src={member.avatarUrl} />
      <Box ml={4}>
        <Text fontWeight="bold">{member.name}</Text>
        <Text>{member.role}</Text>
      </Box>
    </Flex>
  </Box>
);

const TaskItem = ({ task }) => (
  <Box p={4} shadow="md" borderWidth="1px">
    <Text fontWeight="bold">{task.description}</Text>
    <Text>Due Date: {task.due_date}</Text>
    <Text>
      Assigned to:{' '}
      {task.users.map((user, index) => (
        <React.Fragment key={user.id}>
          {user.name}
          {index < task.users.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    </Text>
  </Box>
);

export default PCHPage;





// AddDeveloperModal.jsx


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


