require('dotenv').config()
module.exports = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/fbECommDB',
};
