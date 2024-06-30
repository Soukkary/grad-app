
      import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useToast } from '@chakra-ui/react';
import axiosClient from './axios-client';

const NotificationListener = ({ userId,managerId }) => {
    const toast = useToast();
    const [currentUser, setCurrentUser] = useState(null);

   

    useEffect(() => {
        
            const pusher = new Pusher('8a351db698a9f6549807', {
                cluster: "mt1",
            encrypted: true,
          });
            

          const channel = pusher.subscribe(`private-developer-request.${userId}.${managerId}`);
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
                 pusher.unsubscribe(`private-developer-request.${userId}.${managerId}`);
            };
        
    }, [userId,toast]);

    if (!userId) {
        return <div>Loading...</div>; // Optionally, show a loading state while fetching user data
    }

    return null;
};

export default NotificationListener;
