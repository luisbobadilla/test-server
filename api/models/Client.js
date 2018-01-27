/**
 * Client.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      size: 45,
      required: true,
    },

    address: {
      type: 'string',
      size: 200,
    },

    phone: {
      type: 'integer',
      size: 45,
    },

    rfc: {
      type: 'string',
      size: 45,
    },

    invoices: {
      collection: 'Invoice',
      via: 'client',
    },
  },
};

