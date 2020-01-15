const validateSignup = (user) => {
  if (!user.username) throw('no username');
  if (!user.email) throw('no email');
  if (!user.password) throw('no password');
  return true
}

const validateLogin = (user) => {
  if (!user.username) throw('no username');
  if (!user.password) throw('no password');
  return true;
}

module.exports = { validateLogin, validateSignup };