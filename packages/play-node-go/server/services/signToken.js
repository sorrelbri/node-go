const jwt = require('jsonwebtoken');
require('dotenv').config();

const msDayOffset = 86400000;
const msHourOffset = 3600000;

const signToken = (res, user) => {
  const expiration = process.env.NODE_ENV === 'test' ? msHourOffset : msDayOffset;
  const secret = process.env.NODE_ENV === 'test' ? process.env.TEST_SECRET : process.env.JWT_SECRET;
  const token = jwt.sign({ user }, secret, {
    expiresIn: process.env.NODE_ENV === 'test' ? '1h' : '24h',
  });
  return res.cookie('token', token, {
    expires: new Date(Date.now() + expiration),
    domain: process.env.DOMAIN,
    // secure: false, // set to true if your using https
    httpOnly: true
    // path: '/api/v1'
  });
};
module.exports = signToken;