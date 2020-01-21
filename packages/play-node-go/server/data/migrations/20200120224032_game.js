const winType = [
  'B+R', 'B+', 'B+T',
  'W+R', 'W+', 'W+T',
  '0', 'Void', '?'
]

exports.up = function(knex) {
  return knex.schema.createTable("game", table => {
    table.increments('id').primary();
    table.datetime('date');
    table.float('komi').default(6.5);
    table.integer('handicap').default(0);
    table.integer('board_size').default(19);

    table.string('application');
    table.string('application_version');
    table.timestamps(true, true);

    table.string('player_black');
    table.string('player_white');
    table.string('event');
    table.string('name');
    table.string('description');
    table.integer('round');
    
    table.enu('win_type', winType);
    table.float('score');
    table.integer('black_captures');
    table.integer('white_captures');

    table.integer('user_black').references('id').inTable('user');
    table.integer('user_white').references('id').inTable('user');
    table.integer('room').references('id').inTable('room');
    table.integer('time_setting').references('id').inTable('time_setting');
  })
};

exports.down = knex => knex.schema.dropTableIfExists("game");