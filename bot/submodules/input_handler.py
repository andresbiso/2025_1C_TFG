import asyncio
import os
from submodules.qr_handler import generate_qr_async
from telegram.constants import ParseMode
from ui.builder import show_animated_loader

async def process_input(update, context):
    """
    Handles QR creation using async execution.
    """
    user_input = context.args  # Get arguments from user message
    link = user_input[0]  # First argument is the link
    chat_id = update.message.chat.id
    try:
        processing_msg = await update.message.reply_text("<b>Procesando solicitud |</b>", parse_mode=ParseMode.HTML)
    
        # Start QR generation asynchronously without blocking the event loop
        task = asyncio.create_task(generate_qr_async(update.message.chat_id, link))

        # Show animation while the task runs
        while not task.done():
            await show_animated_loader(processing_msg)
        
        qr_path = f"./images/{chat_id}.png"
        
        if not os.path.exists(qr_path):
            await context.bot.send_message(chat_id=chat_id, text="Error al generar código QR.")
               # os.remove(qr_path)
        if len(user_input) == 1:
        # Case 1: Respond with QR Code
            with open(qr_path, "rb") as qr_code:
                await context.bot.send_document(
                    chat_id=chat_id,
                    document=qr_code,
                    caption="Código QR generado!"
                )
                os.remove(qr_path)
        elif len(user_input) == 2:
            # Case 2: Send QR Code to Contact
            recipient = user_input[1]  # Username or chat ID

            try:
                # get and verify chat ID before sending
                contact_chat_id = recipient
                if not recipient.isdigit():
                    print(f"recipient: {recipient}")
                    chat = await context.bot.get_chat(recipient) 
                    print(f"chat: {chat}")
                    contact_chat_id = chat.id
                with open(qr_path, "rb") as qr_code:
                    await context.bot.send_document(
                        chat_id=contact_chat_id,
                        document=qr_code,
                        caption="Código QR generado!"
                    )
                os.remove(qr_path)
                await update.message.reply_text("✅ QR generado y enviado exitosamente al contacto.")
            except Exception as e:
                await update.message.reply_text("❌ No se pudo enviar el QR. El contacto no existe o el bot no tiene acceso.")
                print(f"Error: {e}")

    except Exception as e:
        print(f"Error en process_input: {e}")
        await context.bot.send_message(chat_id=chat_id, text="Ha ocurrido un error.")
