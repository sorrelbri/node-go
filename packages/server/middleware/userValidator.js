const {check, body, validationResult} = require('express-validator');

const signupValidationRules = () => {
  return [
    check('email', 'invalid email').normalizeEmail().isEmail(),
    check('username', 'invalid username').isString(),
    check('password', 'invalid password').isString().isLength({min: 8}),
    check('confirmPassword', 'invalid password').isString()
      .custom((confirmPassword, { req }) => confirmPassword === req.body.password),
    body('username').escape()
  ]
}

const loginValidationRules = () => {
  return [
    check('username', 'bad credentials').isString(),
    check('password', 'bad credentials').isString()
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  signupValidationRules,
  loginValidationRules,
  validate
}