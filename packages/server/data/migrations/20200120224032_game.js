const winType = ["B+R", "B+", "B+T", "W+R", "W+", "W+T", "0", "Void", "?"];

const rankArray = [
  "D9",
  "D8",
  "D7",
  "D6",
  "D5",
  "D4",
  "D3",
  "D2",
  "D1",
  "K1",
  "K2",
  "K3",
  "K4",
  "K5",
  "K6",
  "K7",
  "K8",
  "K9",
  "K10",
  "K11",
  "K12",
  "K13",
  "K14",
  "K15",
  "K16",
  "K17",
  "K18",
  "K19",
  "K20",
  "K21",
  "K22",
  "K23",
  "K24",
  "K25",
  "K26",
  "K27",
  "K28",
  "K29",
  "K30",
  "UR",
];

exports.up = function (knex) {
  return knex.schema.createTable("game", (table) => {
    table.increments("id").primary();
    table.datetime("date");
    table.float("komi").default(6.5);
    table.integer("handicap").default(0);
    table.integer("board_size").default(19);
    table.boolean("open").default(true);

    table.string("application");
    table.string("application_version");
    table.timestamps(true, true);

    table.string("player_black");
    table.string("player_white");
    table.enu("player_black_rank", rankArray).default("UR");
    table.enu("player_white_rank", rankArray).default("UR");

    table.string("event");
    table.string("name");
    table.string("description");
    table.integer("round");

    table.enu("win_type", winType);
    table.float("score");
    table.integer("captures_black");
    table.integer("captures_white");

    table.integer("user_black").references("id").inTable("user");
    table.integer("user_white").references("id").inTable("user");
    table.integer("room").references("id").inTable("room");
    table.integer("time_setting").references("id").inTable("time_setting");
  });
};

exports.down = (knex) => knex.schema.dropTableIfExists("game");
