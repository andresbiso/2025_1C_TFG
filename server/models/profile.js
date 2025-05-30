const mongoose = require('mongoose');
const telegramIntegrationSchema = require('./integrations/telegramIntegration');

const profileSchema = new mongoose.Schema({
  gender: { type: String },
  dateOfBirth: { type: String },
  about: { type: String, trim: true },
  contactNumber: { type: Number, trim: true },
  integrations: {
    telegram: { type: telegramIntegrationSchema, default: {} },
  },
});

module.exports = mongoose.model('Profile', profileSchema);
