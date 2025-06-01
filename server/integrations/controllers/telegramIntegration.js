const {
  sendMessageToTelegramBotServer,
} = require('../utils/telegramIntegrationUtils');
require('dotenv').config();

// ================ Send Message to Bot Server ================
exports.telegramSendMessage = async (req, res) => {
  try {
    const { integration_data, message } = req.body;
    if (!integration_data || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid integration data' });
    }
    // send message to bot server
    await sendMessageToTelegramBotServer(integration_data.chatId, message);

    // return response successfully
    res.status(200).json({
      success: true,
      message: 'Message sent successfully to telegram bot server',
    });
  } catch (error) {
    console.log('Error while sending message to telegram bot server - ', error);
    res.status(500).json({
      success: false,
      message: 'Error while sending message to telegram bot server',
      error: error.message,
    });
  }
};
