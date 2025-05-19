import schedule
import time
import threading
import requests
import os
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

BOT_NAME = os.getenv("BOT_NAME")
if not BOT_NAME:
    raise ValueError("❌ No se ha encontrado BOT_NAME! Recordá configurarlo en .env.")

BOT_SERVER = os.getenv("BOT_SERVER")
if not BOT_SERVER:
    raise ValueError("❌ No se ha encontrado BOT_SERVER! Recordá configurarlo en .env.")

def send_status_update():
    """Sends bot status update to Flask API."""
    try:
        response = requests.post(BOT_SERVER + "/status", json={"bot_name": BOT_NAME})
        print(f"✅ Status sent: {response.json()}")
    except Exception as e:
        print(f"❌ Error sending status: {e}")

def init_jobs():
    """Starts the scheduled job in a separate background thread."""
    # Schedule the task every 45 seconds
    schedule.every(45).seconds.do(send_status_update)
    print("🛠️ Background job scheduler started!")
