const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
  const secret = process.env.NODE_ENV === 'test' ? process.env.TEST_SECRET : process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret, (err, decoded) => {
    if (err) return err;
    return decoded;
  });
  return decoded;
}

module.exports = verifyToken;