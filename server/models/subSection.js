const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  type: {
    type: String,
    enum: ['video', 'text', 'multipleChoice'],
  },
  /*video*/
  description: {
    type: String,
  },
  video: {
    type: String,
  },
  /*text*/
  text: {
    type: String,
  },
  /*multiple-choice*/
  question: { type: String },
  choices: [{ text: String }],
  correctChoice: { type: Number },
});

module.exports = mongoose.model('SubSection', subSectionSchema);
