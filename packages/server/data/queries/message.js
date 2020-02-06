const knex = require('../db');
const joinUserSelect = [
  'content', 'username', 'admin'
]

const findMessageByRoom = async (roomId) => {
  return await knex
  .from('message')
  .where({'message.room': roomId})
  .select(joinUserSelect)
  .join('user', function() {
    this.on('message.user', '=', 'user.id')
  })
  // .toSQL();
}

module.exports = {
  findMessageByRoom
}