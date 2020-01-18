const userQueries = require('../../data/queries/user');
const verifyToken = require('../../services/verifyToken');

const apiIndex = async (req, res, next) => {
  try {
    if (req.cookies && req.cookies.token) {
      const token = req.cookies.token;
      const verifiedToken = verifyToken(token);
      res.status(200).json(verifiedToken.user)
    }
    res.status(200).json()
  }

  catch {
    res.status(500).json(err);
  }
}

module.exports = {
  apiIndex
}