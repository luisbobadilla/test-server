'use strict';

module.exports = require('jwt-policy')({
  secret: sails.config.auth.appSecret,
});
