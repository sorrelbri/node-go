const knex = require('../data/db')
const signToken = require('../services/signToken');

const signUp = async (req, res, next) => {
  
  const user = req.body;
  try {
    knex('user')
      .insert(user)
      .then(newUser => {
        signToken(res, newUser[0]);
        res.send('ok').status(200);
      }
    )
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