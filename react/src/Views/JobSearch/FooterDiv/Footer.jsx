import React from "react";
import { Box, Grid, Heading, Text, List, ListItem, Link, Flex, Icon, Stack } from "@chakra-ui/react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <Box as="footer" p={{ base: 6, md: 10 }} mb={4} bg="blue.600" rounded="lg">
      <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={8} maxW="1200px" mx="auto">
        <Box>
          <Heading as="h1" size="lg" color="white" pb={4}>
            <strong>Gig </strong>Search
          </Heading>
          <Text color="whiteAlpha.800" pb={4}>
            We always want our seekers and companies to find the best jobs and employers find the best candidates.
          </Text>
        </Box>

        <Stack>
          <Heading as="h3" size="md" color="white" pb={4}>Company</Heading>
          <List spacing={2}>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>About Us</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Features</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>News</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>FAQs</Link></ListItem>
          </List>
        </Stack>

        <Stack>
          <Heading as="h3" size="md" color="white" pb={4}>Resources</Heading>
          <List spacing={2}>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Account</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Support Center</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Feedback</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Contact Us</Link></ListItem>
          </List>
        </Stack>

        <Stack>
          <Heading as="h3" size="md" color="white" pb={4}>Support</Heading>
          <List spacing={2}>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Events</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Promo</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Req Demo</Link></ListItem>
            <ListItem><Link color="whiteAlpha.700" _hover={{ color: "white" }}>Careers</Link></ListItem>
          </List>
        </Stack>

        <Stack>
          <Heading as="h3" size="md" color="white" pb={4}>Contact Info</Heading>
          <Text color="whiteAlpha.800" pb={4}>platform@hotmail.com</Text>
          <Flex gap={4}>
            <Icon as={AiFillInstagram} boxSize={10} color="blue.600" bg="white" p={2} borderRadius="full" />
            <Icon as={BsFacebook} boxSize={10} color="blue.600" bg="white" p={2} borderRadius="full" />
            <Icon as={AiOutlineTwitter} boxSize={10} color="blue.600" bg="white" p={2} borderRadius="full" />
          </Flex>
        </Stack>
      </Grid>
    </Box>
  );
}

export default Footer;
