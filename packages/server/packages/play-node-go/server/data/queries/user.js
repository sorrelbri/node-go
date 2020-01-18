const knex = require('../db')

const insertUser = async (user) => {
  return await knex('user')
  .returning(['username', 'email'])
  .insert(user)
  .then(queryResults => {
    newUser = queryResults[0];
    return newUser
  });
}

const findUserByNameOrEmail = async (user) => {
  if (!user.email && !user.username) return [];
  if (!user.email) user.email = '';
  if (!user.username) user.username = '';

  return await knex('user')
  .where({'username': user.username})
  .orWhere({'email': user.email})
  .select(['username', 'email', 'password'])
}

module.exports = {
  insertUser,
  findUserByNameOrEmail
}