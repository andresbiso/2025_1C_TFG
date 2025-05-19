import os
import sqlite3
from telegram import Update
from telegram.ext import CallbackContext

DATABASE = os.getenv("DB_PATH")
if not DATABASE:
    raise ValueError("❌ No se ha encontrado DB_PATH! Recordá configurarlo en .env.")

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Ensure table supports storing username + chat ID
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            chat_id INTEGER PRIMARY KEY,
            username TEXT UNIQUE
        )
    """)
    
    conn.commit()
    conn.close()

async def store_chat_id(update: Update, _: CallbackContext):
    """
    Stores the user's chat ID and username when they interact with the bot,
    ensuring they are not already stored.
    """
    chat_id = update.message.chat_id
    username = update.message.from_user.username  # Get username

    if not username:  # Handle cases where the user has no username
        username = f"user_{chat_id}"  # Assign a fallback name

    # Check if chat ID or username already exists
    if verify_chat_id(chat_id) or get_chat_id(username):
        return  # Exit function to prevent duplicate insert

    # Store username + chat ID if not already in the database
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (chat_id, username) VALUES (?, ?)", (chat_id, username))
    conn.commit()
    conn.close()

    await update.message.reply_text(f"¡Has sido registrado! Ahora el bot puede enviarte mensajes.\n 👤 Username: {username}\n🆔 Chat ID: {chat_id}")



def get_chat_id(username):
    """
    Retrieves the chat ID from the database using the username or user ID.
    """
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute("SELECT chat_id FROM users WHERE username = ?", (username,))
    row = cursor.fetchone()
    conn.close()

    return row[0] if row else None

def verify_chat_id(chat_id):
    """
    Verifies the chat id is known to the bot.
    """
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE chat_id = ?", (chat_id,))
    row = cursor.fetchone()
    conn.close()

    return row[0] if row else None