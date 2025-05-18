import os
from submodules.setup import setup_bot
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

def main():
    """Launches Telegram bot after setup."""
    application = setup_bot()
    print("🚀 Instancia de Bot de Telegram iniciada!")
    application.run_polling()

if __name__ == "__main__":
    main()
