
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('game').del()
    .then(function () {
      // Inserts seed entries
      return knex('game').insert([
        { 
          id: 1, date: new Date(), 
          application: 'node-go', application_version: '0.1.0', 
          player_black: 'anon', player_white: 'anon',
          player_black_rank: 'K3', player_white_rank: 'K2',
          room: 1, time_setting: 1, open: false
        },
        { 
          id: 2, date: new Date(), 
          application: 'node-go', application_version: '0.1.0', 
          player_black: 'user-one', player_black_rank: 'UR',
          user_black: 2,
          room: 1, time_setting: 1, open: true
        }
      ]);
    });
};