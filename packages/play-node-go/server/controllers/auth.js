const signToken = require('../services/signToken');

const signUp = async (req, res, next) => {
  
  const user = req.body;
  try {
    signToken(res, user);
    res.send('ok').status(200);
  } 
  catch (err) {
    res.status(500).json(err)
  }
}

const login = (req, res, next) => {

}

module.exports = {
  signUp,
  login
}