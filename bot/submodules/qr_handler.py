import asyncio
import qrcode
import os

def generate_qr(chat_id, user_input):
    """
    Generates a QR code image and saves it for the user.
    
    Args:
        chat_id (str): Unique identification for user.
        user_input (str): User-provided string for QR code generation.
    """
    img = qrcode.make(user_input)

    images_dir = "./images"
    os.makedirs(images_dir, exist_ok=True)

    img_path = f"{images_dir}/{chat_id}.png"
    img.save(img_path)

async def generate_qr_async(chat_id, user_input):
    """
    Runs QR generation asynchronously to avoid blocking execution.
    """    
    # QR generation process asynchronously
    return await asyncio.to_thread(generate_qr, chat_id, user_input)  # Run in a separate thread
