const axios = require('axios');
const BOT_SERVER_URL = process.env.BOT_SERVER_URL;

exports.sendMessageToTelegramBotServer = async (chatId, message) => {
  if (!chatId || !message) {
    console.log('ChatID:', chatId);
    console.log('Message:', message);
    console.error('Error: Either chatId or message is missing.');
    return;
  }

  try {
    console.log('ChatID:', chatId);
    console.log('Message:', message);

    const response = await axios.post(`${BOT_SERVER_URL}/send-message`, {
      chat_id: chatId,
      message: message,
      parse_mode: 'MarkdownV2',
    });

    console.log('Message sent successfully!', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error sending message to Telegram bot server:',
      error.response?.data || error.message
    );
    throw error;
  }
};
