const axios = require('axios');
const User = require('../../models/user');
const { ACCOUNT_TYPE } = require('./constants');
const BOT_SERVER_URL = process.env.BOT_SERVER_URL;

const sendMessageToTelegramBotServer = async (chatId, message) => {
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

const getStudentsTelegramEnabled = async () => {
  try {
    return await User.find({
      accountType: ACCOUNT_TYPE.STUDENT, // Ensure user is a student
    })
      .populate('additionalDetails') // Get profile details
      .then((users) =>
        users.filter(
          (user) =>
            user.additionalDetails?.integrations?.telegram?.enabled && // Must have Telegram enabled
            user.additionalDetails?.integrations?.telegram?.notifications
              ?.enabled // Notifications must be enabled
        )
      );
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const sendTelegramNotifications = async (message, totalDuration) => {
  const students = await getStudentsTelegramEnabled();
  for (const student of students) {
    const telegramDetails = student.additionalDetails?.integrations?.telegram;
    if (
      telegramDetails.notifications.receiveAllNewCourses ||
      telegramDetails.notifications.courseLengthThreshold <= totalDuration
    ) {
      message = `Hola ${student.firstName}! ` + message;
    }
    sendMessageToTelegramBotServer(telegramDetails.chatId, message);
  }
};

module.exports = {
  sendMessageToTelegramBotServer,
  sendTelegramNotifications,
};
