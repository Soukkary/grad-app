import { Box, Flex, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure,useToast } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = ({userId}) => {
  const [notifications, setNotifications] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  useEffect(() => {
    
        
        const pusher = new Pusher('8a351db698a9f6549807', {
            cluster: "mt1",
        encrypted: true,
      });
        

      const channel = pusher.subscribe(`developer-request.${userId}`);
        channel.bind('App\\Events\\DeveloperRequestEvent', function (data) {
            toast({
                title: 'New Project Request',
                description: data.message,
                status: 'info',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            });
        });

        return () => {
             pusher.unsubscribe(`developer-request.${userId}`);
        };
    

    // Fetch notifications from the backend
    axios.get('/api/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, [userId]);

  return (
    <Box as="nav" bg="white" w="100%" px={4} py={2} boxShadow="sm" position="fixed" top={0} zIndex={1}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="teal.500">Blueprint</Text>
        
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<BellIcon />}
              variant="ghost"
              color="gray.600"
              onClick={isOpen ? onClose : onOpen}
            />
            <MenuList>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <MenuItem key={index}>{notification}</MenuItem>
                ))
              ) : (
                <MenuItem>No new notifications</MenuItem>
              )}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Avatar} size="sm" ml={4} cursor="pointer" />
            <MenuList>
              <MenuItem>Dashboard</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
