from telegram import Update
from telegram.ext import CallbackContext
from submodules.commands import start_command

async def handle_unknown(update: Update, context: CallbackContext):
    """
    Redirects unrecognized input to the /start command.
    """
    await start_command(update, context)  # Calls /start when input is invalid
