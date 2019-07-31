var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  department: String,
  username: String,
  password: String,
  email: String
});

// Custom validation for email
UserSchema.path('email').validate(val => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

// UserSchema.pre('save', function(next) {
//   var user = this;
//   bcrypt.hash(user.password, null, null, function(err, hash) {
//     if (err) return next(err);
//     user.password = hash;
//     next();
//   });
// });

//Methods

// UserSchema.methods.verifyPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

// UserSchema.methods.generateJwt = function() {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXP
//   });
// };

module.exports = mongoose.model('User', UserSchema);
