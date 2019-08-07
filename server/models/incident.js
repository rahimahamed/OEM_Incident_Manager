const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

const incidentSchema = new Schema({
  INCIDENT_NAME: String,
  SUMMARY: String,
  INCIDENT_TYPE: String,
  STATUS: String,
  CREATION_DATE: String,
  LOCATION_NAME: String,
  ADDRESS: String,
  LATITUDE: String,
  LONGITUDE: String,
  LEAD_AGENCY: String,
  SUPPORTING_AGENCY: String,
  CREATED_BY: String,
  MODIFICATION_DATE: String,
  MODIFIED_BY: String,
  COMMENTS: [
    {
      comment: { type: String },
      commentator: String
    }
  ]
});

module.exports = mongoose.model('incident', incidentSchema, 'incidents');
