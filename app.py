# Import Flask modules for creating API and handling requests
from flask import Flask, jsonify, request

# Initialize Flask app
app = Flask(__name__)

# Dictionary to store all sessions (session_id -> list of tracking data)
sessions = {}


# ENDPOINT: Create a new tracking session
@app.route('/api/sessions', methods=['POST'])
def start_session():
    session_id = f"session_{len(sessions) + 1}"
    sessions[session_id] = []

# ENDPOINT: Log eye tracking data to a session
@app.route('/api/tracking', methods=['POST'])
def log_tracking():
    data = request.get_json()
    session_id = data.get('session_id')
    if session_id in sessions:
        sessions[session_id].append(data)
    data = request.get_json()
    session_id = data.get('session_id')

# Start the Flask server
    if session_id in sessions:
        sessions[session_id].append(data)
    return jsonify({'ok': True})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
