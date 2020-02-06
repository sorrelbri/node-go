
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('game').del()
    .then(function () {
      // Inserts seed entries
      return knex('game').insert([
        { 
          id: 1, date: new Date(), 
          application: 'node-go', application_version: '0.1.0', 
          player_black: 'user-one', player_white: 'user-two',
          player_black_rank: 'UR', player_white_rank: 'UR',
          user_black: 2, user_white: 3,
          room: 1, time_setting: 1, open: false
        },
        { 
          id: 2, date: new Date(), 
          application: 'node-go', application_version: '0.1.0', 
          player_black: 'user-one', player_black_rank: 'UR',
          user_black: 2,
          room: 1, time_setting: 1, open: true
        },
        { 
          id: 3, date: new Date('1971-05-06'), 
          application: 'node-go', application_version: '0.1.0', 
          player_black: 'Ishida Yoshio', player_black_rank: 'D7',
          player_white: 'Rin Kaiho', player_white_rank: 'D9',
          room: 1, time_setting: 1, open: false,
          event: '', round: 2, win_type: 'B+', score: 1.5 
        }
      ]);
    });
};