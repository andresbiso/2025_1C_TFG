import os
from submodules.database_handler import init_db
from submodules.setup import setup_bot
from submodules.jobs import init_jobs
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

def main():
    init_db()
    """Launches Telegram bot after setup."""
    application = setup_bot()
    init_jobs()
    print("🚀 Instancia de Bot de Telegram iniciada!")
    application.run_polling()

if __name__ == "__main__":
    main()
