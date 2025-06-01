const express = require('express');
const router = express.Router();
const telegramRouter = require('./telegramIntegration');

router.use('/telegram', telegramRouter);

module.exports = router;
