'use strict';

module.exports = function socketNoAllowed(req, res, next) {
  if (req.isSocket) {
    return res.badRequest();
  }

  return next();
};
