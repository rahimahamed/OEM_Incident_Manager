const expressJwt = require('express-jwt');
const config = require('../config.json');
const userHelper = require('./user.helper');

module.exports = jwt;

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/api/user/authenticate',
      '/api/user/register',
      '/home'
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userHelper.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
