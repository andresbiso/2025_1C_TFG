import asyncio
from telegram.constants import ParseMode

async def show_animated_loader(message):
    """
    Provides loading animation during QR code generation.
    Args:
        message: message to edit to show loader
    """
    frames = [
        "<b>Procesando solicitud /</b>",
        "<b>Procesando solicitud -</b>",
        "<b>Procesando solicitud \\</b>",
        "<b>Procesando solicitud |</b>"
    ]

    try:
        # Repeat animation cycle a few times for better effect
        for _ in range(3):
            for frame in frames:
                await message.edit_text(text=frame, parse_mode=ParseMode.HTML)
                await asyncio.sleep(0.5)  # Adding delay for smooth animation
    except Exception as e:
        print(f"Error al editar mensaje: {e}")

    return None
