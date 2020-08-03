/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1590115705511_284'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  exports.mongoose = {
    client: {
      // url: 'mongodb://admin:123456@cloud.prochen.com:36502/game_mall', // 测试
      url: 'mongodb://admin:123456@127.0.0.1:27017/game_mall',
      options: {
        useNewUrlParser: true,
        authSource: 'admin',
        useUnifiedTopology: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  }

  return {
    ...config,
    ...userConfig,
  }
}
