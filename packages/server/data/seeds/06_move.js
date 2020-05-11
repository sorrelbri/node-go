
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('move').del()
    .then(async function () {
      // Inserts seed entries
      await knex('game')
        .where({player_black: 'user-one', player_white: 'user-two'})
        .then(async ([game]) => await knex('move')
          .returning('*')
          .insert(
            [
              {player: 'black', point_x: 3,  point_y: 3,   number: 1, game_record: true, game: game.id, prior_move: null},
              {player: 'white', point_x: 15, point_y: 15,  number: 2, game_record: true, game: game.id, prior_move: 1},
              {player: 'black', point_x: 4,  point_y: 15,  number: 3, game_record: true, game: game.id, prior_move: 2},
              {player: 'white', point_x: 15, point_y: 4,   number: 4, game_record: true, game: game.id, prior_move: 3},
            ]
          )
          .then(res => {console.log(res); return res;})
          .catch(e => {console.log(e); return e;})
        )
        .then(() => {})
    })
    .then(() => {})
};
