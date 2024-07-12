import React from 'react';
import ChatBot from 'react-chatbotify';
import config from './configCustom'
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import './customChatbot.css'

const newFlow = {
	start: {
		message: "Xin chào! Bạn muốn kiểm tra chi tiết chiến dịch mùa hè xanh nào?",
		path: "ask_campaign",
	},
	ask_campaign: {
		message: "Vui lòng nhập tên chiến dịch mà bạn đã tham gia:",
		path: "show_details",
	},
	show_details: {
		message: (params) => `Bạn đã chọn chiến dịch: ${params.userInput}. Bạn muốn xem chi tiết hay nhận nhắc nhở thời gian tham gia?`,
		options: ["Xem chi tiết", "Nhận nhắc nhở"],
		path: (params) => params.userInput === "Xem chi tiết" ? "campaign_details" : "send_reminder",
	},
	campaign_details: {
		message: "Dưới đây là chi tiết của chiến dịch...",
		path: "end",
	},
	send_reminder: {
		message: "Nhập thời gian bạn đã tham gia chiến dịch (ví dụ: 10/07/2023 - 20/07/2023):",
		path: (params) => {
			params.injectMessage(`Nhắc nhở: Bạn đã tham gia chiến dịch từ ngày ${params.userInput}.`);
			return "end";
		},
	},
	end: {
		message: "Cảm ơn bạn đã sử dụng dịch vụ! Hẹn gặp lại.",
		path: "loop",
	},
	loop: {
		message: "Bạn có muốn kiểm tra chiến dịch khác không?",
		options: ["Có", "Không"],
		path: (params) => params.userInput === "Có" ? "start" : "end",
	},
};

const newParams = {
	userInput: "",
	prevPath: "start",
};
const ChatBotComponent = () => {
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            <ChatBot 
            //  config={config}
            //  messageParser={MessageParser}
            //  actionProvider={ActionProvider}/>
            flow={newFlow}
						params={newParams}
						options={{
							audio: { disabled: false },
							chatInput: { botDelay: 1000 },
							userBubble: { showAvatar: true },
							botBubble: { showAvatar: true },
							voice: { disabled: false }
						}}
					></ChatBot>
        </div>
    );
};

export default ChatBotComponent;
