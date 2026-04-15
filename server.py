"""
backend/server.py
Simple Flask proxy server that securely handles Anthropic API key.
Run this locally so you don't expose your API key in frontend code.
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')

@app.route('/v1/messages', methods=['POST'])
def proxy_claude():
    """Proxy endpoint — frontend sends requests here instead of directly to Anthropic."""
    try:
        data = request.json
        kwargs = {
            'model': data.get('model', 'claude-sonnet-4-20250514'),
            'max_tokens': data.get('max_tokens', 1000),
            'messages': data['messages']
        }
        if 'system' in data:
            kwargs['system'] = data['system']

        message = client.messages.create(**kwargs)
        return jsonify({
            'content': [{'type': 'text', 'text': message.content[0].text}]
        })
    except Exception as e:
        return jsonify({'error': {'message': str(e)}}), 500

if __name__ == '__main__':
    print("🚀 DSA AI Prep backend running at http://localhost:5000")
    print("📖 Open http://localhost:5000 in your browser")
    app.run(debug=True, port=5000)
