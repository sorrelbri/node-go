const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  const secret = process.env.NODE_ENV === 'test' ? process.env.TEST_SECRET : process.env.JWT_SECRET;
  try {
    if (!token) {
      return res.status(401).json('You need to Login')
    }
    const decrypt = await jwt.verify(token, secret);
    req.user = {
      id: decrypt.id,
      username: username,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;