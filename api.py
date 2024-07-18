# api.py
from flask import Flask, jsonify, request
from chat_logic import ChatService

app = Flask(__name__)
chat_service = ChatService()

@app.route('/api/messages', methods=['GET'])
def get_messages():
    return jsonify(chat_service.messages)

@app.route('/api/reset_chat', methods=['POST'])
def reset_chat():
    chat_service.reset_chat()
    return jsonify({'status': 'success'})

@app.route('/api/process_input', methods=['POST'])
def process_input():
    data = request.json
    if 'info' in data:
        updated_messages = chat_service.process_input(data['info'])
        return jsonify(updated_messages)
    return jsonify({'error': 'No input provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)