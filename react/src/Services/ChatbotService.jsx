import axiosClient from "../Views/axios-client";
import axios from "axios";

export const saveChat = async (message, response) => {
    const token = localStorage.getItem('token'); // Assumes token is stored in localStorage
    const headers = { Authorization: `Bearer ${token}` };

    const result = await axiosClient.post('/save-chat', { message, response }, { headers });
    return result.data;
};

export const getChatHistory = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const result = await axiosClient.get('/chat-history', { headers });
    return result.data;
};
