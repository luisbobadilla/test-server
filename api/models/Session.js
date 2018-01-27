/**
 * Session.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    token: {
      type: 'string',
      size: 250,
      required: true,
    },

    date: {
      type: 'datetime',
      required: true,
    },

    user: {
      model: 'User',
      required: true,
    },
  },

  beforeValidate(values, cb) {
    values.date = new Date();

    return cb();
  }
};

