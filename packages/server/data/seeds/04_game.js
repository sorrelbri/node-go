
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('game').del()
    .then(async function () {
      // Inserts seed entries
      await knex('user')
        .select('id')
        .orderBy('id')
        .whereIn('username', ['user-one', 'user-two'])
        .then(async ([userOne, userTwo]) => {
          const res = await knex('room')
            .select('id')
            .where({name: 'main'})
            .then(([room]) => {
              console.log('inserting')
              return knex('game').insert(
                  [
                    { 
                      date: new Date(), 
                      application: 'node-go', application_version: '0.1.0', 
                      player_black: 'user-one', player_white: 'user-two',
                      player_black_rank: 'UR', player_white_rank: 'UR',
                      user_black: userOne.id, user_white: userTwo.id,
                      room: room.id, open: false
                    },
                    { 
                      date: new Date(), 
                      application: 'node-go', application_version: '0.1.0', 
                      player_black: 'user-one', player_black_rank: 'UR',
                      user_black: userTwo.id,
                      room: room.id, open: true
                    },
                    { 
                      date: new Date('1971-05-06'), 
                      application: 'node-go', application_version: '0.1.0', 
                      player_black: 'Ishida Yoshio', player_black_rank: 'D7',
                      player_white: 'Rin Kaiho', player_white_rank: 'D9',
                      room: room.id, open: true,
                      event: '', round: 2, win_type: 'B+', score: 1.5 
                    }
                  ], ['*']
                )
                .then(res => res)
                .catch(e => {console.log('error'); console.log(e)})
            }).then(entries => {console.log({success: 'game', entries})})
        });
    })
};