var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Validate Function to check comment length
let commentLengthChecker = comment => {
  // Check if comment exists
  if (!comment[0]) {
    return false; // Return error
  } else {
    // Check comment length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if comment length requirement is not met
    } else {
      return true; // Return comment as valid
    }
  }
};

// Array of Comment validators
const commentValidators = [
  // First comment validator
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

var commentSchema = new Schema({
  incident_id: String,
  comment: { type: String, validate: commentValidators },
  commentator: String
});

module.exports = mongoose.model('comment', commentSchema, 'comments');
