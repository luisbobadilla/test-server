/**
 * InvoiceProduct.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    price: {
      type: 'float',
      required: true,
    },

    quantity: {
      type: 'integer',
      required: true,
    },

    product: {
      model: 'Product',
      required: true,
    },

    invoice: {
      model: 'Invoice',
      required: true,
    },
  },
};

