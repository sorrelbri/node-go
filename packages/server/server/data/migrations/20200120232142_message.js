exports.up = knex => {
  return knex.schema.createTable("message", table => {
    table.increments('id').primary();
    table.timestamps(true, true)
    table.text('content').notNullable();

    table.integer('move').references('id').inTable('move');
    table.integer('room').references('id').inTable('room');
    table.integer('user').references('id').inTable('user').notNullable();
  });
};

exports.down = knex => knex.schema.dropTableIfExists("message");
