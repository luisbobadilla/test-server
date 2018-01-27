/**
 * Invoice.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    date: {
      type: 'datetime',
      required: true,
    },

    client: {
      model: 'Client',
      required: true,
    },

    details: {
      collection: 'InvoiceProduct',
      via: 'invoice',
    },
  },

  beforeValidate(values, cb) {
    values.date = new Date();

    return cb();
  },
};

