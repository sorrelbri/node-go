const bcrypt = require('bcrypt');
require('dotenv').config();

const saltRounds = process.env.NODE_ENV === 'test' ? 5 : process.env.SALT_ROUNDS;

const hashPassword = async (password) => {

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword;
}

const compareHash = async (password, hash) => {

  const success = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) reject(err);
      if (res) return true;
      return false;
    })
  });

  return compareHash;
}

module.exports = { hashPassword, compareHash };