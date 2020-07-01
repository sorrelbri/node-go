const knex = require("../db");

const findGameRecord = async (gameId) => {
  return await knex("move")
    .where({ game: gameId, game_record: true })
    .select("player", "point_x", "point_y", "number", "prior_move", "placement")
    .orderBy("number")
    .then((record) =>
      record.map(({ player, point_x, point_y }) => ({
        player,
        pos: { x: point_x, y: point_y },
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
      .then((res) => res);
  } catch (e) {
    result = e;
  } finally {
    console.log(result);
    return result;
  }
};

module.exports = {
  findGameRecord,
  addMove,
};
