/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    username: {
      type: 'string',
      size: 45,
      unique: true,
    },

    password: {
      type: 'string',
      size: 200,
      required: true,
      protected: true,
    },

    sessions: {
      collection: 'Session',
      via: 'user',
    },

    comparePassword(password) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        });
      });
    },
  },

  beforeCreate(values, cb) {
    bcrypt.hash(values.password, 10, (err, hash) => {
      if (err) {
        return cb(err);
      }

      values.password = hash;

      return cb();
    });
  },
};

