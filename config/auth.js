/**
 * Auth Configuration
 * (sails.config.auth)
 */
module.exports.auth = {

  /**
   * Expose the lodash installed in Sails core as a global variable. If this
   * is disabled, like any other node module you can always run npm install
   * lodash --save, then var _ = require('lodash') at the top of any file.
   */
  appSecret: process.env.APP_SECRET || 'appsecret',
};
