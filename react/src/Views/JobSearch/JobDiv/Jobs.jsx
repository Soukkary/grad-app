import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Image, Flex, Text, Spinner, Avatar, Button, Stack, useToast } from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import axiosClient from "../../axios-client"; // Update the path as needed

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchJobs = async (page, searchQuery = '') => {
    try {
      const response = await axiosClient.get(`/gigs`, {
        params: {
          page: page,
          search: searchQuery,
        }
      });
      if (response.status >= 200 && response.status < 300) {
        setJobs(response.data.gigs);
        setTotalPages(response.data.totalPages);
        setCurrentPage(page);
      } else {
        throw new Error('Failed to fetch jobs');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error fetching jobs",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    setLoading(true);
    fetchJobs(parseInt(page), searchQuery);
  }, [location.search, currentPage]);

  const getImageUrl = (path) => {
    return path ? `${import.meta.env.VITE_API_BASE_URL}/images/${path}` : 'default-image-url'; // Replace 'your-api-base-url' and 'default-image-url' with actual values
  };

  const handlePageChange = (page) => {
    if (page > 0) {
      const searchParams = new URLSearchParams(location.search);
      const searchQuery = searchParams.get('search') || '';
      navigate(`?page=${page}&search=${searchQuery}`);
    }
  };

  return (
    <Box py={10}>
      <Flex wrap="wrap" justify="center" gap={10}>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          jobs.map(({ id, gigname, image, freelancerImage, freelancerName, desc }) => (
            <Box key={id} w={{ base: "100%", sm: "45%", md: "30%", lg: "22%" }} p={4} bg="white" rounded="lg" shadow="lg" _hover={{ bg: "blue.50" }}>
              <Box as="a" href={`/gig-info/${id}`} target="_blank" rel="noopener noreferrer" aria-label="Go to gig" display="block" position="relative">
                <Box position="relative">
                  <Image src={getImageUrl(image)} alt={gigname} roundedTop="lg" objectFit="cover" w="100%" />
                </Box>
              </Box>
              <Flex justify="space-between" align="center" mt={4}>
                <Flex align="center">
                  <Avatar src={getImageUrl(freelancerImage)} name={freelancerName} />
                  <Text ml={2} fontSize="lg">{freelancerName}</Text>
                </Flex>
              </Flex>
              <Link to={`/gig-info/${id}`} aria-label="Go to gig">
                <Text mt={4} color="blue.600" fontWeight="light" _hover={{ textDecoration: "underline" }}>{desc}</Text>
              </Link>
              <Flex align="center" mt={2}>
                <Flex align="center" color="black.500">
                  <IoIosStar width="16" height="16" fill="currentColor" className="mr-1" />
                  <Text fontSize="16px" fontWeight="semibold" mt="0.5">Rating</Text> {/* Add actual rating here */}
                </Flex>
                <Text ml={2} color="gray.500" fontSize="sm" mt="0.5">(Reviews)</Text> {/* Add actual reviews count here */}
              </Flex>
              <Text mt={4} fontSize="lg" fontWeight="semibold" color="gray.800">
                From $Price {/* Add actual price here */}
              </Text>
            </Box>
          ))
        )}
      </Flex>
      <Flex justify="center" mt={10}>
        <Stack direction="row" spacing={4}>
          <Button onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage === 1}>
            Previous
          </Button>
          <Button onClick={() => handlePageChange(currentPage + 1)} isDisabled={currentPage === totalPages}>
            Next
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Jobs;
