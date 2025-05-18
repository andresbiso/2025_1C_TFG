import os
from dotenv import load_dotenv
from health_ping import HealthPing
from submodules.setup import setup_bot

# Load environment variables before usage
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

if os.getenv("HEALTHCHECKS_ENDPOINT"):
    HealthPing(url=os.getenv("HEALTHCHECKS_ENDPOINT"),
               schedule="1 * * * *",
               retries=[60, 300, 720]).start()

def main():
    """
    Launches the bot after setup.
    """
    application = setup_bot()

    print("Instancia de Bot de Telegram iniciada!")
    application.run_polling()  # Runs bot synchronously

if __name__ == '__main__':
    main()
