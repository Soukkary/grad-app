// src/hooks/usePusher.js
import { useEffect } from 'react';
import Pusher from 'pusher-js';

const usePusher = (channelName, eventName, callback) => {
    useEffect(() => {
        const channel = Pusher.subscribe(channelName);
        channel.bind(eventName, callback);

        return () => {
            channel.unbind(eventName, callback);
            pusher.unsubscribe(channelName);
        };
    }, [channelName, eventName, callback]);
};

export default usePusher;
