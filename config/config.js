require('dotenv').config()
module.exports = {
  PORT: process.env.PORT || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret',
  EMAIL: process.env.EMAIL || 'claymindsolutions10@outlook.com',
  PASS: process.env.PASS || 'Cl@ymind10',
};