/**
 * Product.js
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

    description: {
      type: 'string',
      size: 200,
      required: true,
    },

    price: {
      type: 'float',
      required: true,
    },
  },
};

