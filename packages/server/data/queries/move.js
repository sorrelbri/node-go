const knex = require("../db");

const findGameRecord = async (gameId) => {
  return await knex("move")
    .where({ game: gameId, game_record: true })
    .select(
      "player",
      "point_x",
      "point_y",
      "number",
      "prior_move",
      "placement",
      "id"
    )
    .orderBy("number")
    .then((record) =>
      record.map(({ player, point_x, point_y, id, prior_move }) => ({
        player,
        pos: { x: point_x, y: point_y },
        id,
        prior: prior_move,
      }))
    );
  // .then(res => res)
};

// id: 1, player: 'black', point_x: 3,  point_y: 3, number: 1, game_record: true, game: 1, prior_move: null

const addMove = async ({ gameId, player, x, y, gameRecord, priorMove }) => {
  // ! priorMove must be FK not move number
  const number = priorMove + 1;
  let result;
  try {
    result = await knex("move")
      .returning("*")
      .insert({
        game: gameId,
        player,
        point_x: x,
        point_y: y,
        number,
        game_record: gameRecord,
        prior_move: priorMove,
      })
      .then((res) => res[0]);
  } catch (e) {
    result = e;
  } finally {
    return result;
  }
};

module.exports = {
  findGameRecord,
  addMove,
};
