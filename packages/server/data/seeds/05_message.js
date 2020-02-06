
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('message').del()
    .then(function () {
      // Inserts seed entries
      return knex('message').insert([
        {id: 1, content: 'Hey! Welcome to the general room!', room: 1, user: 2}
      ]);
    });
};