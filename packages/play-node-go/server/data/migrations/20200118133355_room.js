const languageArray = [
  'EN'
]

exports.up = function(knex) {
  return knex.schema.createTable("room", table => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.text('description').notNullable();
    table.boolean('private').notNullable().defaultTo(false);
    table.enu('language', languageArray).notNullable().defaultTo('EN');
  })
};

exports.down = knex => knex.schema.dropTableIfExists("room");
