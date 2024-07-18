from YWZbot import ChatBot

class ChatService:
    def __init__(self):
        self.messages = [{"role": "assistant", "content": "我是“医问知”小助手，请输入你的问题。"}]
        self.chatbot = ChatBot(True)  # 假设RAG总是True，或从配置中读取

    def reset_chat(self):
        self.messages.clear()
        self.messages.append({"role": "assistant", "content": "我是“医问知”小助手，请输入你的问题。"})
        self.chatbot = ChatBot(True)

    def process_input(self, user_input):
        response = self.chatbot.answer(user_input)
        self.messages.append({"role": "assistant", "content": response})
        return self.messages