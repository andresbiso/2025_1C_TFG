const mongoose = require('mongoose');

const telegramIntegrationSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false },
  chatId: {
    type: String,
    trim: true,
  },
  notifications: {
    enabled: { type: Boolean, default: false },
    courseLengthThreshold: {
      type: Number,
    },
    receiveAllNewCourses: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = telegramIntegrationSchema;
