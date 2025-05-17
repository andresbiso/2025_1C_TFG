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

    # Ensure the images directory exists
    images_dir = "./images"
    os.makedirs(images_dir, exist_ok=True)

    img_path = f"{images_dir}/{chat_id}.png"
    img.save(img_path)
    return None
