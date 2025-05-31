const express = require('express');
const router = express.Router();

// integration controller
const { telegramSendMessage } = require('../controllers/integration');

// Middlewares
const { auth } = require('../middleware/auth');

// ********************************************************************************************************
//                                      Telegram routes
// ********************************************************************************************************
router.post('/telegram/sendMessage', auth, telegramSendMessage);

module.exports = router;
