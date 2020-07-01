const players = ["white", "black"];

exports.up = (knex) => {
  return knex.schema.createTable("move", (table) => {
    table.increments("id").primary();
    table.enu("player", players).notNullable();
    table.integer("point_x").notNullable();
    table.integer("point_y").notNullable();
    table.integer("number").notNullable();
    table.boolean("game_record").notNullable().default(true);
    table.boolean("placement").notNullable().default(false);

    table.integer("game").references("id").inTable("game").notNullable();
    table.integer("prior_move").references("id").inTable("move");
  });
};

exports.down = (knex) => knex.schema.dropTableIfExists("move");
