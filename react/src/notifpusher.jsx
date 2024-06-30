import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

window.Pusher = Pusher;

const usePusher = (userId) => {
  const toast = useToast();
  const response =  axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`);

  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: '8a351db698a9f6549807',
      cluster: 'mt1',
      encrypted: true,
     
    });

    const channel = echo.private(`developer-request.${userId}`);

    channel.listen('DeveloperRequestEvent', (data) => {
      toast({
        title: 'New Project Request',
        description: data.message,
        status: 'info',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    });

    return () => {
      echo.leaveChannel(`private-developer-request.${userId}`);
    };
  }, [userId, toast]);
};

export default usePusher;
