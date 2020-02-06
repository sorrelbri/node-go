const rankArray = [
  'D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'D1',
  'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10',
  'K11', 'K12', 'K13', 'K14', 'K15', 'K16', 'K17', 'K18', 'K19', 'K20',
  'K21', 'K22', 'K23', 'K24', 'K25', 'K26', 'K27', 'K28', 'K29', 'K30', 'UR'
]

exports.up = knex => {
  return knex.schema.createTable("user", table => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    table.enu('rank', rankArray).notNullable().defaultTo('UR')
    table.integer('elo');
    table.boolean('rank_certainty').defaultTo(false);
    table.timestamps(true, true);
  })
};

exports.down = knex => knex.schema.dropTableIfExists("user");
