import React, { useState } from 'react';
import { ChakraProvider, Box, Input, IconButton, useColorMode, useColorModeValue, VStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { extendTheme } from "@chakra-ui/react";
import { ArrowForwardIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const theme = extendTheme({
  colors: {
    azure: {
      500: '#007FFF',
    },
  },
});

const ChatbotPage = () => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const ColorModeIcon = useColorModeValue(MoonIcon, SunIcon);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = { text: inputValue, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate receiving a message
    setTimeout(() => {
      const botMessage = { text: "This is a simulated response.", sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        bg={bgColor}
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={4}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box as={motion.div}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
               fontSize="2xl"
               color="azure.500"
          >
            Azure
          </Box>
          <IconButton
            icon={<ColorModeIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
          />
        </Box>

        <Box as={motion.div}
             flex="1"
             p={4}
             borderWidth="1px"
             borderRadius="lg"
             overflowY="auto"
             mb={4}
             borderColor={inputBorderColor}
        >
          <VStack spacing={4} align="start">
            {messages.map((message, index) => (
              <Text key={index} alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'} bg={message.sender === 'user' ? 'azure.500' : 'gray.600'} color="white" p={2} borderRadius="lg">
                {message.text}
              </Text>
            ))}
          </VStack>
        </Box>

        <Box as={motion.div}
             display="flex"
             alignItems="center"
        >
          <Input
            placeholder="Write your message..."
            bg={inputBg}
            borderColor={inputBorderColor}
            flex="1"
            mr={2}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton
            colorScheme="azure"
            icon={<ArrowForwardIcon />}
            onClick={handleSendMessage}
            aria-label="Send message"
          />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default ChatbotPage;
