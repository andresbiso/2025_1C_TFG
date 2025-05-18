import os
import threading
from api.routes import api_routes
from flask import Flask
from dotenv import load_dotenv
from health_ping import HealthPing
from submodules.setup import setup_bot

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

# Initialize Flask app
app = Flask(__name__)
app.register_blueprint(api_routes)  # Register the routes from `routes.py`

def run_flask():
    """Runs Flask web server."""
    print("🚀 Flask server is running on port 9020!")
    app.run(host="0.0.0.0", port=9020)

def run_telegram_bot():
    """Launches Telegram bot after setup."""
    application = setup_bot()
    app.config["BOT_APP"] = application  # Store bot instance globally
    print("Instancia de Bot de Telegram iniciada!")
    application.run_polling()  # Runs bot synchronously

def main():
    """Starts both Flask and Telegram bot in parallel."""
    if os.getenv("HEALTHCHECKS_ENDPOINT"):
        HealthPing(url=os.getenv("HEALTHCHECKS_ENDPOINT"),
                   schedule="1 * * * *",
                   retries=[60, 300, 720]).start()

    # Start both Flask and the bot in separate threads
    threading.Thread(target=run_flask, daemon=True).start()
    run_telegram_bot()  # Runs bot normally

if __name__ == "__main__":
    main()
