const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-pedidos';

module.exports = function connect() {
  return mongoose.connect(MONGODB_URI);
};
