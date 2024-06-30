import { useEffect, useState } from 'react';
import { getChatHistory } from '../../Services/ChatbotService';

function ChatbotSidebar({ loadChatHistory }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const chatHistory = await getChatHistory();
            setHistory(chatHistory);
        };
        fetchHistory();
    }, []);

    const handleHistoryClick = (chatId) => {
        loadChatHistory(chatId);
    };

    return (
        <div className="w-[300px] bg-gray-200 p-[50px] overflow-y-auto h-full">
            <h2 className="text-lg font-bold mb-4">Chat History</h2>
            {history.length === 0 ? (
                <p>No chats available</p>
            ) : (
                <ul>
                    {history.map((chat, index) => (
                        <li key={index} className="mb-2">
                            <button
                                className="bg-blue-500 text-white p-2 rounded w-full text-left"
                                onClick={() => handleHistoryClick(chat.id)}
                            >
                                {chat.message.slice(0, 20)}...
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ChatbotSidebar;
