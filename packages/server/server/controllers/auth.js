const knex = require('../data/db')

const { hashPassword, compareHash } = require('../services/bcrypt');
const signToken = require('../services/signToken');
const { validateSignup, validateLogin } = require('../services/userValidate');

const signup = async (req, res, next) => {
  
  const user = req.body;
  if (!validateSignup(user)) return;
  
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

const login = async (req, res, next) => {
  
  const user = req.body;
  if (!validateLogin(user)) return;

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