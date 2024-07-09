import React from 'react';
import ChatBot from 'react-chatbotify';
import './chatboxCustom.css'
const ChatBotComponent = () => {
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            <ChatBot />
        </div>
    );
};

export default ChatBotComponent;
