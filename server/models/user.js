var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  email: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

// Custom validation for email
UserSchema.path('email').validate(val => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
