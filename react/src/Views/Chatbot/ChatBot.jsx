import { useState, useEffect } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import { saveChat, getChatHistory } from '../../Services/ChatbotService';
import ChatbotSidebar from "../../Components/sidebar/ChatbotSidebar";

//const API_KEY = "sk-blueprint-6IuUBM8mTPt09m9ffNAYT3BlbkFJQmGl6Fj2xOr3fGLXlO4H";

function ChatBot() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am Azure Assistant!",
            sender: "Azure Assistant",
            direction: "incoming"
        }
    ]) // []

    // Load chat history on component mount
    const loadChatHistory = async (chatId = null) => {
        if (chatId === null) {
            setMessages([
                {
                    message: "Hello, I am Azure Assistant!",
                    sender: "Azure Assistant",
                    direction: "incoming"
                }
            ]);
        } else {
            const history = await getChatHistory(chatId);
            const formattedHistory = history.map(item => ([
                { message: item.message, sender: "user", direction: "outgoing" },
                { message: item.response, sender: "Azure Assistant", direction: "incoming" }
            ])).flat();
            setMessages(formattedHistory);
        }
    };

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, newMessage];  //all the old messages + the new mesage
        //update our message state
        setMessages(newMessages);

        //set a typing indicator (Chatbot is typing...)
        setTyping(true);
        //process the messages to chatgpt (send it over and see the response)
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages) {
        //chatMessages {sender: "user" or "ChatGPT", message: "The message content here"}
        //apiMessages {role: "user" or "assistant" , content: "The message content here"}  This is how we translate a message so the chatbot can understand
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if(messageObject.sender === "Azure Assistant") {
                role = "assistant"
            } else {
                role = "user"
            }
            return { role: role, content: messageObject.message}
        });

        //role: "user" -> a msg from the user, "assistant" -> a response from ChatGPT
        //"system" -> generally one initial msg defining HOW we want ChatGPT to talk
        const systemMessage = {
            role: "system",
            content: "Explain like I am a business analyst consultant."  //e.g. speak like a pirate.
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages  //[msg1, msg2, msg3, etc..]
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then(async (data) => {
            const responseMessage = {
                message: data.choices[0].message.content,
                sender: "Azure Assistant",
                direction: "incoming"
            };
            const updatedMessages = [...chatMessages, responseMessage];
            setMessages(updatedMessages);
            setTyping(false);

            // Save the chat message and response
            await saveChat(chatMessages[chatMessages.length - 1].message, responseMessage.message);
        });
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <ChatbotSidebar loadChatHistory={loadChatHistory} />
            <div className="flex-1 h-full bg-white rounded-lg shadow-lg p-4 m-4">
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator = {typing ? <TypingIndicator content="Azure Assistant is typing..."/> : null} scrollBehavior="smooth">
                        {messages.map((message, i) => {
                            return <Message key={i} model={message} />;
                        })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default ChatBot;
