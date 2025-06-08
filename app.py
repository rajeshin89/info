from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import re, sqlite3, os, datetime

app = Flask(__name__, static_folder='.')
CORS(app)  # allow JS fetches from same host/port

DB = 'subscribers.db'
EMAIL_RE = re.compile(r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$')

# ---------- DB Setup ----------
def init_db():
    with sqlite3.connect(DB) as con:
        con.execute('''
            CREATE TABLE IF NOT EXISTS subscribers(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                subscribed_at TEXT NOT NULL
            )
        ''')
init_db()

# ---------- API ----------
@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json(force=True)
    email = data.get('email', '').strip().lower()

    if not EMAIL_RE.match(email):
        return jsonify(success=False, message='Invalid email format'), 400

    try:
        with sqlite3.connect(DB) as con:
            con.execute('INSERT INTO subscribers(email, subscribed_at) VALUES(?, ?)',
                        (email, datetime.datetime.utcnow().isoformat()))
        return jsonify(success=True, message='Thanks for subscribing! 🎉')
    except sqlite3.IntegrityError:
        return jsonify(success=False, message='Email already subscribed 🤗'), 409
    except Exception:
        return jsonify(success=False, message='Server error, please try later'), 500

# ---------- Serve Portfolio Files ----------
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route('/')
def root():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
