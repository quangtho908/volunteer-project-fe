import React from 'react';
import ChatBot from 'react-chatbotify';
import './chatboxCustom.css'
import config from './configCustom'
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const ChatBotComponent = () => {
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            <ChatBot 
             config={config}
             messageParser={MessageParser}
             actionProvider={ActionProvider}/>
        </div>
    );
};

export default ChatBotComponent;
