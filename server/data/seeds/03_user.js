const {hashPassword} = require('../../services/bcrypt');
require('dotenv').config();
const password = process.env.USER_ONE_PASSWORD;
const hashedPassword = hashPassword(password);
const email = process.env.USER_ONE_EMAIL;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 2, username: 'user-one', email: email, password: hashedPassword, admin: true},
      ]);
    });
};