import { stateReducer } from "../reducer";

export const gamesReducer = (state, action) => {
  switch (action.message) {
    case "SET_GAMES": {
      const games = formatGames(action);
      return { ...state, games };
    }

    case "JOIN_REQUEST": {
      return joinRequest(state, action);
    }

    case "UPDATE_BOARD": {
      return updateBoard(state, action);
    }

    case "GAME_RESIGN": {
      return gameResign(state, action);
    }

    case "SET_ACTIVE": {
      return { ...state, active: action.body };
    }

    case "GAME_END": {
      console.log(action.body);
      return state;
    }

    default: {
      return state;
    }
  }
};

// parse ranks from db in K9 format to 9k format
function parseRank(rank) {
  switch (rank[0]) {
    // Dan ranks
    case "D":
      return `${rank.slice(1)}${rank[0].toLowerCase()}`;
    // Kyu ranks
    case "K":
      return `${rank.slice(1)}${rank[0].toLowerCase()}`;
    // Unranked
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

function joinRequest(state, action) {
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

function updateBoard(state, action) {
  const {
    gameRecord,
    pass,
    turn,
    winner,
    playerState,
    territory,
  } = action.body.meta;
  return {
    ...state,
    board: action.body.board,
    meta: { gameRecord, pass, turn, winner, playerState, territory },
  };
}

function gameResign(state, action) {
  const { gameRecord, pass, turn, winner, playerState } = action.body;
  return {
    ...state,
    meta: { gameRecord, pass, turn, winner, playerState },
  };
}
