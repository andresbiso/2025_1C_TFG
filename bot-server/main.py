import os
from flask import Flask
from api.database import init_db
from api.routes import api_routes
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

# Initialize Flask app
app = Flask(__name__)
app.register_blueprint(api_routes)

def main():
    init_db()
    """Runs Flask web server."""
    print("🚀 Flask server is running on port 9020!")
    app.run(host="0.0.0.0", port=9020)

if __name__ == "__main__":    
    main()
