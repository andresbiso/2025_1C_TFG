const express = require('express');
const router = express.Router();

// integration controller
const { telegramSendMessage } = require('../controllers/telegramIntegration');

// Middlewares
const { auth } = require('../../middleware/auth');

// ********************************************************************************************************
//                                      Telegram routes
// ********************************************************************************************************
router.post('/sendMessage', auth, telegramSendMessage);

module.exports = router;
