from flask import Blueprint, jsonify, request, current_app
from submodules.setup import setup_bot

# Initialize Blueprint to group API routes
api_routes = Blueprint("api", __name__)

@api_routes.route("/", methods=["GET"])
def root():
    """Redirects root `/` to status."""
    return status()

@api_routes.route("/status", methods=["GET"])
def status():
    """Returns bot status"""
    return jsonify({"status": "Bot is running!", "health": "OK"}), 200

@api_routes.route("/send-message", methods=["POST"])
async def send_message():
    """
    Receives a JSON payload with chat_id and message, then sends it via Telegram.
    """
    data = request.json
    chat_id = data.get("chat_id")
    message = data.get("message")
    application = current_app.config["BOT_APP"]

    if not chat_id or not message:
        return jsonify({"error": "Missing chat_id or message"}), 400

    await application.bot.send_message(chat_id=chat_id, text=message)
    return jsonify({"status": "Message sent successfully!"}), 200

# Export the Blueprint
__all__ = ["api_routes"]
