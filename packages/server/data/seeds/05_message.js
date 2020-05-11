
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('message').del()
    .then(async function () {
      // Inserts seed entries
      await knex('room')
        .where({name: 'main'})
        .then(async ([room]) => await knex('user')
          .where({username: 'user-two'})
          .then(async ([user]) => {
            const res = await knex('message')
            .returning('*')
            .insert(
              [
                {content: 'Hey! Welcome to the general room!', room: room.id, user: user.id}
              ]
            )
            .then(entries => {console.log({success: 'message', entries}); return res;})
            .catch(e => e)
            return res;
          }
          )
          .then(() => {})
        ).then(() => {})
    }).then(() => {})
};