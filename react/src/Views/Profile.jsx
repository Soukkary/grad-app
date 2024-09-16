// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
  VStack,
  Avatar,
  Badge,
  Button,
} from '@chakra-ui/react';
import axiosClient from '../Views/axios-client'; // Adjust the import path as necessary
import MessagingWindow from '../Components/MessagingWindow.jsx'; // Import the new MessagingWindow component

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    initials: '',
    name: '',
    title: '',
    skills: [],
    experience: [],
  });
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [gigsError, setGigsError] = useState(null);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosClient.get(`/userprofile/${userId}`);
        const skillsArray = Array.isArray(response.data.skills)
          ? response.data.skills
          : response.data.skills.split(',').map(skill => skill.trim());

        const experienceArray = Array.isArray(response.data.experience)
          ? response.data.experience
          : response.data.experience.split(',').map(exp => ({ title: exp, period: '', description: '' }));

        setUserData({
          ...response.data,
          skills: skillsArray,
          experience: experienceArray,
        });

        setLoading(false);
      } catch (error) {
        setProfileError('Error fetching user data.');
        setLoading(false);
      }
    };

    const fetchUserGigs = async () => {
      try {
        const response = await axiosClient.get(`/usergigs/${userId}`);
        setGigs(response.data);
      } catch (error) {
        setGigsError('Error fetching user gigs.');
      }
    };

    fetchUserData();
    fetchUserGigs();
  }, [userId]);

  if (loading) {
    return (
      <Flex align="center" justify="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg="gray.100">
      {/* Navbar */}
      <Box bg="blue.600" color="white" shadow="lg">
        <Container maxW="container.xl" py="4">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg">
              <Box as="i" className="fas fa-user-circle" mr="2" />
              Profile
            </Heading>
            <HStack spacing="4">
              <Link href="#" _hover={{ color: 'blue.400' }}>Home</Link>
              <Link href="#" _hover={{ color: 'blue.400' }}>About</Link>
              <Link href="#" _hover={{ color: 'blue.400' }}>Contact</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Banner and Profile Info */}
      <Box bg="white" shadow="lg" mb="8">
        <Image
          src="https://source.unsplash.com/random/1200x300"
          alt="Banner"
          w="full"
          h="48"
          objectFit="cover"
        />
        <Container maxW="container.xl" position="relative">
          <Flex justify="center" mt="-12">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Avatar size="2xl" name={userData.name} src="" />
            </motion.div>
          </Flex>
          <Box textAlign="center" mt="4">
            <Heading as="h2" size="xl">{userData.name}</Heading>
            <Text fontSize="lg" color="gray.600">{userData.title}</Text>
            <Button mt="4" colorScheme="blue" onClick={() => setIsMessagingOpen(true)}>Message</Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py="8">
        <Stack direction={{ base: 'column', lg: 'row' }} spacing="4">
          {/* Skills and Experience */}
          <VStack flexBasis="33.33%" spacing="8">
            <Box bg="white" shadow="lg" rounded="lg" p="6" w="full">
              <Heading as="h3" size="lg" mb="4">Skills</Heading>
              <VStack align="start">
                {userData.skills.map((skill, index) => (
                  <Badge key={index} colorScheme="blue" px="4" py="2" rounded="md">
                    {skill}
                  </Badge>
                ))}
              </VStack>
            </Box>

            <Box bg="white" shadow="lg" rounded="lg" p="6" w="full">
              <Heading as="h3" size="lg" mb="4">Experience</Heading>
              <VStack align="start" spacing="6">
                {userData.experience.map((job, index) => (
                  <Box key={index} p="4" bg="gray.50" rounded="lg" shadow="md" w="full">
                    <Heading as="h4" size="md" mb="2">{job.title}</Heading>
                    <Text color="gray.600" mb="2">{job.period}</Text>
                    <Text>{job.description}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>

          {/* Gigs */}
          {gigs.length > 0 ? (
            <Box flexBasis="66.67%" bg="white" shadow="lg" rounded="lg" p="6">
              <Heading as="h3" size="lg" mb="4">Gigs</Heading>
              <VStack spacing="6">
                {gigs.map((gig, index) => (
                  <Box key={index} p="4" bg="gray.50" rounded="lg" shadow="md" w="full">
                    <Heading as="h4" size="md" mb="2">{gig.title}</Heading>
                    <Text color="gray.600" mb="2">{gig.period}</Text>
                    <Text>{gig.description}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          ) : (
            <Box flexBasis="66.67%" bg="white" shadow="lg" rounded="lg" p="6">
              <Heading as="h3" size="lg" mb="4">Gigs</Heading>
              <Text>No gigs available</Text>
            </Box>
          )}
        </Stack>
      </Container>

      {/* Messaging Window */}
      {isMessagingOpen && (
        <Box position="fixed" bottom="4" right="4" w="96" h="96" zIndex="1000">
          <MessagingWindow
            recipientId={userId}
            recipientName={userData.name}
            onClose={() => setIsMessagingOpen(false)}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
