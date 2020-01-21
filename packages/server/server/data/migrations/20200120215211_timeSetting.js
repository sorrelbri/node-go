const timeTypes = ['untimed','game', 'byoYomi', 'move'];

exports.up = function(knex) {
  return knex.schema.createTable("time_setting", table => {
    table.increments('id').primary();
    table.enu('main_time', timeTypes).notNullable();
    table.integer('time_period').notNullable();             // number of periods
    table.integer('period_length').notNullable();           // length in seconds
    table.enu('overtime', timeTypes).notNullable();
    table.integer('overtime_period').notNullable();         // number of periods
    table.integer('overtime_length').notNullable();         // length in seconds
  })
};

exports.down = knex => knex.schema.dropTableIfExists("time_setting");