'use strict';

module.exports = function (req, res, next) {

  Client
    .findOne(req.param('clientId'))
    .then((client) => {
      if (!client) {
        throw { status: 404 };
      }

      req.client = client;

      return next();
    })
    .catch(res.negotiate);
};
