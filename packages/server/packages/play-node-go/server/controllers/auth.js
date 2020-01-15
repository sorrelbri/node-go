const knex = require('../data/db')

const { hashPassword, compareHash } = require('../services/bcrypt');
const signToken = require('../services/signToken');

const { validationResult } = require('express-validator');

const checkValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
}

const signup = async (req, res, next) => {
  
  checkValidationErrors(req, res);
  
  const user = req.body;
  
  try {
    
    const hashedPassword = await hashPassword(user.password);
    const secureUser = { ...user, password: hashedPassword }
    
    knex('user')
    .returning(['username', 'email'])
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

const login = async (req, res, next) => {

  checkValidationErrors(req, res);

  const user = req.body;

  try {

    const queryResults = await knex('user')
    .where({username: user.username})
    .select()
    .then(queryResults => queryResults);
    
    const savedUser = queryResults[0] || null;
    if (!savedUser) return res.status(401).json({err: 'bad credentials'});
    
    const hashedPassword = savedUser.password;
    const passwordMatch = await compareHash(user.password, hashedPassword);
    if (!passwordMatch) return res.status(401).json({err: 'bad credentials'});
    
    const authorizedUser = {...savedUser};
    delete authorizedUser.password;
    
    signToken(res, authorizedUser);
    res.send('ok').status(200);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  signup,
  login
}