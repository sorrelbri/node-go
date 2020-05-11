
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('room').del()
    .then(function () {
      // Inserts seed entries
      return knex('room').insert([
        {name: 'main', description: 'A general place to play Go'},
        {name: 'private', description: 'A private place to play Go', private: true},
      ]);
    });
};
