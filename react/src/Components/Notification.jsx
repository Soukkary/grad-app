// Notification.jsx
import React from 'react';
import { Box, Text, useToast } from '@chakra-ui/react';

const Notification = ({ sender }) => {
  const toast = useToast();

  // Trigger toast notification when component mounts
  React.useEffect(() => {
    toast({
      title: `You received a message from ${sender}`,
      status: 'success',
      position: 'top-right',
      duration: 3000, // Display duration in milliseconds
      isClosable: true,
    });
  }, [toast, sender]);

  return <Box />; // Empty box, since toast is handled by Chakra UI
};

export default Notification;
