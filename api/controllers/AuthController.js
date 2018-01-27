/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const Auth = require('../../lib/Auth');

module.exports = {

  login(req, res) {
    const username = req.param('username');
    const password = req.param('password');

    User
      .findOne({ username })
      .then((user) => {
        if (!user) {
          throw { status: 404 };
        }

        return Promise.all([user, user.comparePassword(password)]);
      })
      .then(([user, authentication]) => {
        if (!authentication) {
          throw { status: 403 };
        }

        return Promise.all([user, Auth.createToken(user)]);
      })
      .then(([user, token]) => {
        return Session.create({
          user: user.id,
          token
        });
      })
      .then((session) => {
        return res.ok({
          token: session.token,
        });
      })
      .catch(res.negotiate);
  },

  logout(req, res) {
    return Session
      .destroy(req.sessionId)
      .then(res.ok)
      .catch((err) => {
        sails.log(err);
        return res.negotiate(err);
      });
  }
};

