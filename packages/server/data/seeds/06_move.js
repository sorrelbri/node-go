
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('move').del()
    .then(function () {
      // Inserts seed entries
      return knex('move').insert([
        {id: 1, player: 'black', point_x: 3,  point_y: 3,   number: 1, game_record: true, game: 1, prior_move: null},
        {id: 2, player: 'white', point_x: 15, point_y: 15,  number: 2, game_record: true, game: 1, prior_move: 1},
        {id: 3, player: 'black', point_x: 4,  point_y: 15,  number: 3, game_record: true, game: 1, prior_move: 2},
        {id: 4, player: 'white', point_x: 15, point_y: 4,   number: 4, game_record: true, game: 1, prior_move: 3},
      ]);
    });
};
