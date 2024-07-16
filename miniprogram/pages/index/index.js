Page({
    data: {
        chatList: {
            userMessages: [], // 用户发言数组，每个元素都是一个消息对象
            modelMessages: [] // 模型回答数组，每个元素都是一个消息对象
        },
        inputValue: '', // 用户输入
        userAvatar: '', // 用户头像
        modelAvatar: '', // 大模型头像
        modelResult: '' // 存储大模型结果的字段
    },
    onLoad() {
        // 初始化用户和大模型的头像URL
        this.setData({
            userAvatar: '../../images/icon-model-selected.png',
            modelAvatar: '../../images/icon-model-selected.png'
        });
    },
    onInput(e) {
        this.setData({
            inputValue: e.detail.value
        });
    },
    submitInfo() {
        console.log('用户输入的内容：', this.data.inputValue);
        const info = this.data.inputValue;
        if (info) {
            // 清空输入框
            this.setData({
                inputValue: '' // 这里清空输入框
            });

            // 创建一个包含头像和文本的消息对象
            const userMessage = {
                text: info,
                avatar: this.data.userAvatar
            };
            this.addChatMessage(userMessage, 'userMessages');

            // 使用大模型的 API 发送问题并获取结果
            this.setData({
                modelResult: '等待大模型响应...'
            });
            wx.request({
                url: '大模型服务的 URL',
                data: {
                    info: info
                },
                success: (res) => {
                    const modelMessage = {
                        text: res.data.result,
                        avatar: this.data.modelAvatar
                    };
                    this.addChatMessage(modelMessage, 'modelMessages');
                },
                fail: (error) => {
                    const modelMessage = {
                        text: '请求失败，请重试',
                        avatar: this.data.modelAvatar
                    };
                    this.addChatMessage(modelMessage, 'modelMessages');
                }
            });
        }
    },
    addChatMessage(message, listName) {
        const updatedList = [...this.data.chatList[listName]];
        updatedList.push(message);
        this.setData({
            ['chatList.' + listName]: updatedList
        });
    }
});