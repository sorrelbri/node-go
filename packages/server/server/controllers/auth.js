
const { validationResult } = require('express-validator');

const userQueries = require('../data/queries/user');
const { hashPassword, compareHash } = require('../services/bcrypt');
const signToken = require('../services/signToken');

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
    delete user.confirmPassword;
    const hashedPassword = await hashPassword(user.password);
    const secureUser = { ...user, password: hashedPassword };
    const existingUser = await userQueries.findUserByNameOrEmail(secureUser);

    if (existingUser.length) {
      return res.status(409).json({errors: [{auth: 'User already exists!'}]})
    }

    const newUser = await userQueries.insertUser(secureUser)
    signToken(res, newUser).status(201).json({...newUser});
  } 

  catch (err) {
    res.status(500).json(err);
  }
}

const login = async (req, res, next) => {

  checkValidationErrors(req, res);
  const user = req.body;

  try {
    const queryResults = await userQueries.findUserByNameOrEmail(user);
    const savedUser = queryResults[0] || null;

    if (!savedUser) {
      return res.status(401).json({err: 'bad credentials'});
    }
    
    const hashedPassword = savedUser.password;
    const passwordMatch = await compareHash(user.password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({err: 'bad credentials'});
    }
    
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