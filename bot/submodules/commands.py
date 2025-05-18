import re
from submodules.database_handler import store_chat_id
from submodules.input_handler import process_input
import sqlite3
from telegram import Update
from telegram.constants import ParseMode
from telegram.ext import CallbackContext

async def start_command(update: Update, context: CallbackContext):
    await store_chat_id(update, context)
    
    """
    Introduces the bot and lists available actions clearly.
    """
    intro_message = (
        "👋 ¡Hola\! Soy *Platform Connect Bot*, tu asistente\. Aquí están mis comandos:\n\n"
        "🚀 */start* \- Presentación del bot y cómo funciona\.\n"
        "🖼️ */create \<link\>* \- Genera un código QR a partir de un enlace\.\n"
        "✉️ */create \<link\> \<nombre usuario o id de contacto\>* \- Genera un código QR y lo envía a un contacto\.\n"
        "⏹️ */cancel* \- Cancela la última acción en proceso\.\n"
        "📖 */help* \- Muestra nuevamente este menú\.\n\n"
        "✨ *Consejo:* Puedes escribir un comando en cualquier momento para activarlo\.\n"
        "✨ ¡Escribe un comando y comencemos\!"
    )
    await update.message.reply_text(intro_message, parse_mode=ParseMode.MARKDOWN_V2)



async def help_command(update: Update, _: CallbackContext):
    """
    Displays help menu with clearer descriptions.
    """
    help_message = (
        "ℹ️ *Lista de comandos disponibles:*\n\n"
        "🚀 */start* \- Presentación del bot y cómo funciona\.\n"
        "🖼️ */create \<link\>* \- Genera un código QR a partir de un enlace\.\n"
        "✉️ */create \<link\> \<nombre usuario o id de contacto\>* \- Genera un código QR y lo envía a un contacto\.\n"
        "⏹️ */cancel* \- Cancela la última acción en proceso\.\n"
        "📖 */help* \- Muestra nuevamente este menú\.\n\n"
        "✨ *Consejo:* Puedes escribir un comando en cualquier momento para activarlo\."
    )
    
    await update.message.reply_text(help_message, parse_mode=ParseMode.MARKDOWN_V2)



async def cancel_command(update: Update, context: CallbackContext):
    """
    Cancels QR code generation by setting the cancel flag.
    """
    context.user_data["cancel"] = True  # Properly sets a cancel flag
    await update.message.reply_text("✅ Generación de QR cancelada!")

async def create_command(update: Update, context: CallbackContext):
    """
    Handles QR code generation based on user input.
    - If one value (link) is received, it generates and responds.
    - If two values (link + contact ID) are received, it also sends the link to the contact.
    """
    user_input = context.args  # Get arguments from user message

    if len(user_input) < 1:
        await update.message.reply_text("❌ Debes proporcionar al menos un enlace válido.")
        await help_command(update, context);
        return
    
    if len(user_input) > 2:
        await update.message.reply_text("❌ Comando no válido.")
        await help_command(update, context);
        return

    link = user_input[0]  # First argument is assumed to be the link
    url_pattern = re.compile(r"https?://\S+")

    if not re.match(url_pattern, link):
        await update.message.reply_text("❌ Enlace no válido. Asegúrate de incluir 'http://' o 'https://'.")
        return

    await process_input(update, context)




