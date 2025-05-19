from datetime import datetime, timedelta
import os
import sqlite3

DATABASE = os.getenv("DB_PATH")
if not DATABASE:
    raise ValueError("❌ No se ha encontrado DB_PATH! Recordá configurarlo en .env.")

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS bot_status (
                        bot_name TEXT PRIMARY KEY,
                        status TEXT,
                        last_modified TEXT)''')
    conn.commit()
    conn.close()
    
def check_and_update_status():
    """Updates bots to 'BROKEN' if last modified time exceeds 1 minute."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    one_minute_ago = (datetime.now() - timedelta(minutes=1)).strftime("%Y-%m-%d %H:%M:%S")
    
    cursor.execute('''UPDATE bot_status 
                      SET status="BROKEN" 
                      WHERE last_modified < ?''', (one_minute_ago,))
    
    conn.commit()
    conn.close()