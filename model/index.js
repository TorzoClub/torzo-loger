const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.db, {
  server: { poolSize: 20 },
  function (err) {
    if (err) {
      console.error('mongodb 连接错误: ', config.db, err.message);
      process.exit(1);
    }
  }
});

require('./policy');
require('./history');
require('./user');

exports.Policy  = mongoose.model('Policy');
exports.History = mongoose.model('History');
exports.User    = mongoose.model('User');
