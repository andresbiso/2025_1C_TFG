import os
import asyncio

from telegram.constants import ParseMode
from submodules import qr_handler as qh
from ui.builder import show_animated_loader


# ------------------- User input functions ------------------- #
async def show_help(update, context):
    """
    Function to list help commands.
    Args:
        update: default telegram arg
        context: default telegram arg
    """
    await update.message.reply_text(
        """Simply send a text to generate a QR for it!\n""",
        parse_mode=ParseMode.HTML,
        disable_web_page_preview=True
    )
    return None


async def generate_qr_async(chat_id, text):
    """
    Runs QR generation in a separate thread to avoid blocking async execution.
    """
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, qh.generate_qr, chat_id, text)


async def get_input(update, context):
    """
    Function to get input string from user.
    Args:
        update: default telegram arg
        context: default telegram arg
    """
    chat_id = update.message.chat.id
    try:
        processing_msg = await update.message.reply_text(
            "<b>Generating QR Code |</b>", parse_mode=ParseMode.HTML
        )

        # Run QR generation asynchronously
        await generate_qr_async(chat_id, update.message.text)

        # Animate loading with proper delay
        for _ in range(3):
            await show_animated_loader(processing_msg)
            await asyncio.sleep(0.5)

        # Send generated QR code safely
        qr_path = f"./images/{chat_id}.png"
        if os.path.exists(qr_path):
            with open(qr_path, "rb") as qr_code:
                await context.bot.send_document(
                    chat_id=chat_id,
                    document=qr_code,
                    caption="Here is your QR Code!"
                )

            # Remove file after sending
            os.remove(qr_path)
        else:
            await context.bot.send_message(
                chat_id=chat_id, text="QR Code generation failed.", parse_mode=ParseMode.HTML
            )

    except Exception as e:
        print(f"Error in get_input: {e}")
        await context.bot.send_message(
            chat_id=chat_id, text="An error has occurred.", parse_mode=ParseMode.HTML
        )

    return None
