'use strict';

module.exports = function (req, res, next) {

  Session
    .findOne({ token: req.param('token') })
    .then((session) => {
      if (!session) {
        throw { status: 401 };
      }

      req.sessionId = session.id;

      return next();
    })
    .catch(res.negotiate);
};
