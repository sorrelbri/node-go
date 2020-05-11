const {hashPassword} = require('../../services/bcrypt');
require('dotenv').config();

const password = process.env.USER_ONE_PASSWORD;
const email = process.env.USER_ONE_EMAIL;

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
  .then(async function () {
      const hashedPassword = await hashPassword(password);
      // Inserts seed entries
      return knex('user').returning('*').insert([
        {username: 'user-one', email: email, password: hashedPassword, admin: true},
        {username: 'user-two', email: `2${email}`, password: hashedPassword, admin: true},
      ]).then(entries => console.log({success: 'user', entries}));
    });
};