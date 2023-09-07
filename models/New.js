const mongoose = require('mongoose');

const New = mongoose.model('New', {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = New;
