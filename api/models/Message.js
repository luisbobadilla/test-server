/**
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      size: 45,
      unique: true,
    },
    message: {
      type: 'string',
      size: 200,
      required: true,
      protected: true,
    },
    date: {
      type: 'datetime',
      defaultsTo: 'now'
    },
    /*room: {
      type: 'string',
      size: 200,
      required: true,
      protected: true,
    },
    sessions: {
      collection: 'Session',
      via: 'user',
    },*/
  }
};

