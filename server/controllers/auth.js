const knex = require('../data/db')
const { hashPassword, compareHash } = require('../services/bcrypt');

const signToken = require('../services/signToken');

const signUp = async (req, res, next) => {
  
  const user = req.body;
  try {
    
    const hashedPassword = await hashPassword(user.password);
    const secureUser = { ...user, password: hashedPassword }
    
    knex('user')
    .insert(secureUser)
    .then(queryResults => {
      const newUser = queryResults[0];
      signToken(res, newUser);
      res.send('ok').status(200);
    })
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