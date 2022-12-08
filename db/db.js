require('dotenv').config()
const mongoose = require('mongoose')
const dbConfig = require('../config/db.config.js')

// open the MongoDB connection
const connectDB = async () => {
    try {
      await mongoose.connect(
        dbConfig.MONGO_URL || 'mongodb://localhost:27017/fbECommDB',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      )
  
      console.log('Successfully connected to the MongoDB database.')
    } catch (error) {
      console.error('MongoDB connection FAIL')
      process.exit(1)
    }
  }
  
  module.exports = {connectDB}