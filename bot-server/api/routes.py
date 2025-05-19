import os
import requests
import sqlite3
import telegramify_markdown
from api.database import check_and_update_status
from datetime import datetime
from flask import Blueprint, jsonify, request

BOT_TOKEN = os.getenv("BOT_TOKEN")
if not BOT_TOKEN:
    raise ValueError("❌ No se ha encontrado BOT_TOKEN! Recordá configurarlo en .env.")

TELEGRAM_API_URL = os.getenv("TELEGRAM_API_URL")
if not TELEGRAM_API_URL:
    raise ValueError("❌ No se ha encontrado TELEGRAM_API_URL! Recordá configurarlo en .env.")

TELEGRAM_API_URL = TELEGRAM_API_URL.replace("{BOT_TOKEN}", BOT_TOKEN)

DATABASE = os.getenv("DB_PATH")
if not DATABASE:
    raise ValueError("❌ No se ha encontrado DB_PATH! Recordá configurarlo en .env.")

# Initialize Blueprint to group API routes
api_routes = Blueprint("api", __name__)

@api_routes.route("/", methods=["GET"])
def root():
    """Redirects root `/` to status."""
    return get_status()

@api_routes.route('/status', methods=['GET'])
def get_status():
    check_and_update_status()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT bot_name, status, last_modified FROM bot_status')
    bots = cursor.fetchall()
    conn.close()

    return jsonify([{"bot_name": bot[0], "status": bot[1], "last_modified": bot[2]} for bot in bots])

@api_routes.route('/status', methods=['POST'])
def update_status():
    data = request.json
    bot_name = data.get("bot_name")
    status = "OK"
    last_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if not bot_name:
        return jsonify({"error": "bot_name required"}), 400

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO bot_status (bot_name, status, last_modified)
                      VALUES (?, ?, ?)
                      ON CONFLICT(bot_name) DO UPDATE 
                      SET status=?, last_modified=?''',
                      (bot_name, status, last_modified, status, last_modified))
    conn.commit()
    conn.close()

    return jsonify({"message": f"Bot {bot_name} status updated!"})

@api_routes.route("/send-message", methods=["POST"])
async def send_message():
    """
    Receives a JSON payload with chat_id and message, then sends it via Telegram.
    """
    data = request.json
    chat_id = data.get("chat_id")
    message = data.get("message")
    parse_mode = data.get("parse_mode")

    if not chat_id or not message or not parse_mode:
        return jsonify({"error": "Missing chat_id or message or parse_mode"}), 400
    
    if parse_mode.lower() == "markdownv2":
        message = telegramify_markdown.markdownify(
            message,
            max_line_length=None,
            normalize_whitespace=False
        )

    # Send request to Telegram API
    # More info: https://core.telegram.org/bots/api#sendmessage
    # Formatting options: https://core.telegram.org/bots/api#formatting-options
    response = requests.post(TELEGRAM_API_URL + "/sendMessage", json={"chat_id": chat_id, "text": message, "parse_mode": parse_mode})
    return jsonify({"status": "Message sent successfully!"}), 200

# Export the Blueprint
__all__ = ["api_routes"]
