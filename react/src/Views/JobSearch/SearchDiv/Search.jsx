import React from "react";
import { Box, Flex, Input, IconButton, Button, Select, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const Search = () => {
  return (
    <Box className="searchDiv" bg="gray.100" rounded="lg" p={{ base: 4, md: 12 }} mb={4}>
      <form>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          rounded="md"
          gap={{ base: 4, md: 4 }}
          bg="white"
          p={5}
          boxShadow="lg"
        >
          <Flex gap={4} align="center" w="100%">
            <IconButton
              icon={<AiOutlineSearch />}
              aria-label="Search job"
              size="lg"
              variant="ghost"
            />
            <Input
              type="text"
              placeholder="Search Job Here..."
              variant="unstyled"
              color="blue.500"
              flex="1"
            />
            <IconButton
              icon={<AiOutlineCloseCircle />}
              aria-label="Clear search"
              size="lg"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "gray.600" }}
            />
          </Flex>
          <Flex gap={4} align="center" w="100%">
            <IconButton
              icon={<BsHouseDoor />}
              aria-label="Search by company"
              size="lg"
              variant="ghost"
            />
            <Input
              type="text"
              placeholder="Search By Company..."
              variant="unstyled"
              color="blue.500"
              flex="1"
            />
            <IconButton
              icon={<AiOutlineCloseCircle />}
              aria-label="Clear search"
              size="lg"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "gray.600" }}
            />
          </Flex>
          <Flex gap={4} align="center" w="100%">
            <IconButton
              icon={<CiLocationOn />}
              aria-label="Search by location"
              size="lg"
              variant="ghost"
            />
            <Input
              type="text"
              placeholder="Search By Location..."
              variant="unstyled"
              color="blue.500"
              flex="1"
            />
            <IconButton
              icon={<AiOutlineCloseCircle />}
              aria-label="Clear search"
              size="lg"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "gray.600" }}
            />
          </Flex>
          <Button colorScheme="blue" p={5} px={10} rounded="md">
            Search
          </Button>
        </Flex>
      </form>

      <Flex direction={{ base: "column", md: "row" }} mt={14} gap={4} justify="center" align="center">
        <FormControl id="relevance" w={{ base: "100%", md: "auto" }}>
          <FormLabel color="gray.600" fontWeight="semibold">Sort by:</FormLabel>
          <Select placeholder="Choose Option" bg="white">
            <option value="Relevance">Relevance</option>
            <option value="Inclusive">Inclusive</option>
            <option value="Starts With">Starts With</option>
            <option value="Contains">Contains</option>
          </Select>
        </FormControl>

        <FormControl id="type" w={{ base: "100%", md: "auto" }}>
          <FormLabel color="gray.600" fontWeight="semibold">Type:</FormLabel>
          <Select placeholder="Choose Option" bg="white">
            <option value="Full-Time">Full-Time</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
            <option value="Part-Time">Part-Time</option>
          </Select>
        </FormControl>

        <FormControl id="level" w={{ base: "100%", md: "auto" }}>
          <FormLabel color="gray.600" fontWeight="semibold">Level:</FormLabel>
          <Select placeholder="Choose Option" bg="white">
            <option value="Senior">Senior</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advocate">Advocate</option>
          </Select>
        </FormControl>

        <Button variant="link" color="gray.400">
          Clear All
        </Button>
      </Flex>
    </Box>
  );
}

export default Search;
