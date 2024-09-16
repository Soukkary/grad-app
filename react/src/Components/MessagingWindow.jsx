import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axiosClient from '../Views/axios-client';

const MessageWindow = ({ recipientId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const pusher = new Pusher("8a351db698a9f6549807", {
            cluster: "mt1",
            encrypted: true,
        });

        const channel = pusher.subscribe('chat');

        const handleNewMessage = (data) => {
            console.log('New message received:', data);
            setMessages(prevMessages => [...prevMessages, data.message]);
        };

        channel.bind('App\\Events\\MessageSent', handleNewMessage);

        return () => {
            channel.unbind('App\\Events\\MessageSent', handleNewMessage);
            pusher.disconnect();
        };
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        try {
            await axiosClient.post('/messages', {
                recipient_id: recipientId,
                message: newMessage,
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                    <div key={index} className="bg-gray-100 p-2 mb-2 rounded-lg">
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessageWindow;
