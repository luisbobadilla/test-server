'use strict';

const sails = require('sails');

before(function (done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(25000);

  sails.lift({
    // configuration for testing purposes
    hooks: {
      grunt: false,
      views: false,
    },
  }, function (err) {
    if (err) {
      return done(err);
    }

    // here you can load fixtures, etc.
    return done(err, sails);
  });
});

after(function (done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
