'use strict';

const jwt = require('jsonwebtoken');
const _ = require('lodash');

class Auth {

  static createToken(payload) {
    const opts = { noTimestamp: true };
    const appSecret = sails.config.auth.appSecret;

    return new Promise((resolve, reject) => {
      jwt.sign(_.omit(payload, ['password']), appSecret, opts, (err, token) => {
        if (err) {
          return reject(err);
        }

        return resolve(token);
      });
    });
  }
}

module.exports = Auth;
