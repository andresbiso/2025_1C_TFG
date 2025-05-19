import asyncio
import os
from telegram import BotCommand
from telegram.ext import Application, CommandHandler, MessageHandler, filters
from submodules.commands import cancel_command, create_command, help_command, start_command, get_register_info_command
from submodules.message_handler import handle_unknown

async def set_bot_commands(application):
    """
    Registers bot commands so they appear as suggestions when typing '/'.
    """
    commands = [
        BotCommand("start", "Introduce el bot"),
        BotCommand("create", "Genera un código QR"),
        BotCommand("cancel", "Detener una acción"),
        BotCommand("help", "Muestra nuevamente este menú")
    ]
    
    await application.bot.set_my_commands(commands)  # Properly awaited

def setup_bot():
    """
    Initializes bot settings before launching.
    """
    token = os.getenv("BOT_TOKEN")
    if not token:
        raise ValueError("❌ No se ha encontrado BOT_TOKEN! Recordá configurarlo en .env.")

    application = Application.builder().token(token).build()

    # Register bot commands
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("cancel", cancel_command))
    application.add_handler(CommandHandler("create", create_command))
    application.add_handler(CommandHandler("getregisterinfo", get_register_info_command))
    
    # Handle unknown messages
    application.add_handler(MessageHandler(filters.ALL, handle_unknown))

    # Ensure async function runs properly inside a sync function
    loop = asyncio.get_event_loop()
    loop.run_until_complete(set_bot_commands(application))  # Fixes event loop issue

    return application  # Returns bot instance

