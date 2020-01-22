
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('room').del()
    .then(function () {
      // Inserts seed entries
      return knex('room').insert([
        {id: 1, name: 'main', description: 'A general place to play Go'},
        {id: 2, name: 'private', description: 'A private place to play Go', private: true},
      ]);
    });
};
