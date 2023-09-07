const mongoose = require('mongoose');

const Marketing = mongoose.model('Marketing', {

  image: {
    type: String,
    required: true
  }
  
});

module.exports = Marketing;
