import { stateReducer } from "../reducer";

export const gamesReducer = (state, action) => {
  switch (action.message) {
    case "SET_GAMES": {
      const games = formatGames(action);
      return { ...state, games };
    }

    case "JOIN_REQUEST": {
      if (!Object.entries(state.user).length) {
        const errAction = {
          type: "ERR",
          message: "JOIN_GAME_ERROR",
          body: { joinGameError: "user not logged in" },
        };
        return stateReducer(state, errAction);
      }
      const id = action.body;
      return { ...state, joinGame: id };
    }

    case "UPDATE_BOARD": {
      const { gameRecord, pass, turn, winner, playerState } = action.body.meta;
      return {
        ...state,
        board: action.body.board,
        meta: { gameRecord, pass, turn, winner, playerState },
      };
    }

    case "GAME_RESIGN": {
      const { gameRecord, pass, turn, winner, playerState } = action.body;
      return {
        ...state,
        meta: { gameRecord, pass, turn, winner, playerState },
      };
    }

    case "SET_ACTIVE": {
      return { ...state, active: action.body };
    }

    default: {
      return state;
    }
  }
};

function parseRank(rank) {
  switch (rank[0]) {
    case "D":
      return `${rank.slice(1)}${rank[0].toLowerCase()}`;
    case "K":
      return `${rank.slice(1)}${rank[0].toLowerCase()}`;
    case "U":
      return "?";
    default:
      return "?";
  }
}

function formatGames(action) {
  const games = [...action.body].map((game) => {
    if (game.playerBlackRank) {
      game.playerBlackRank = parseRank(game.playerBlackRank);
    }

    if (game.playerWhiteRank) {
      game.playerWhiteRank = parseRank(game.playerWhiteRank);
    }

    return game;
  });

  return games;
}
