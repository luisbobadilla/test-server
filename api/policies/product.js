'use strict';

module.exports = function (req, res, next) {

  Product
    .findOne(req.param('productId'))
    .then((product) => {
      if (!product) {
        throw { status: 404 };
      }

      req.product = product;

      return next();
    })
    .catch(res.negotiate);
};
