class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet() {
        const greetingMessage = this.createChatBotMessage("Hello, friend.");
        this.setState(prev => ({
            ...prev,
            messages: [...prev.messages, greetingMessage]
        }));
    }
}

export default ActionProvider;