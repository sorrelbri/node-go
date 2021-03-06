import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gamesServices from "../../services/api/gamesServices";
import "./Game.scss";
import Logo from "../../components/Display/Logo/Logo";
import Board from "../../components/GameUI/Board/Board";
import PlayerArea from "../../components/GameUI/PlayerArea/PlayerArea";
import Kifu from "../../components/GameUI/Kifu/Kifu";
import Menu from "../../components/GameUI/Menu/Menu";

const Game = (props) => {
  const { state, dispatch } = props;
  const gameId = parseInt(useParams().id) || 0;
  const [playerBlackMeta, setPlayerBlackMeta] = useState({});
  const [playerWhiteMeta, setPlayerWhiteMeta] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const playerState = state?.meta?.playerState;
  const game = state.active?.game;

  useEffect(() => {
    const fetchGameAPI = async () => {
      const response = await gamesServices.getGameService(gameId);
      if (response) {
        const action = {
          type: "GAMES",
          message: "SET_ACTIVE",
          body: response,
        };
        return dispatch(action);
      }
    };
    fetchGameAPI();
  }, [gameId, dispatch]);

  useEffect(() => {
    const roomSocketConnect = () => {
      const game = state.active.game;
      const user = state.user;
      const action = {
        type: "SOCKET",
        message: "CONNECT_GAME",
        body: { game, user, dispatch },
      };
      return dispatch(action);
    };
    roomSocketConnect();
  }, [state.active.game, dispatch, state.user]);

  useEffect(() => {
    if (!game || !playerState) return;
    const { playerBlack, playerBlackRank, playerWhite, playerWhiteRank } = game;
    const { bCaptures, wCaptures } = playerState;
    setPlayerBlackMeta({
      player: playerBlack,
      rank: playerBlackRank,
      captures: bCaptures,
      stones: "black",
    });
    setPlayerWhiteMeta({
      player: playerWhite,
      rank: playerWhiteRank,
      captures: wCaptures,
      stones: "white",
    });
  }, [playerState, game]);

  const handleResignClick = (player) => {
    const action = {
      type: "SOCKET",
      message: "RESIGN",
      body: { game, player },
    };
    dispatch(action);
  };

  const handlePassClick = (player) => {
    if (state?.meta && state?.meta?.winner) return;
    if (state?.meta && state?.meta?.turn === 0) {
      const action = {
        type: "SOCKET",
        message: "END_GAME",
        body: { game, player },
      };
      return dispatch(action);
    }
    const action = {
      type: "SOCKET",
      message: "PASS",
      body: { game, player },
    };
    dispatch(action);
  };

  return (
    <div className="Game" data-testid="Game">
      <Menu
        showMenu={showMenu}
        clickClose={() => setShowMenu(false)}
        {...props}
      />
      <div className="Game__meta-container">
        <span className="Game__socket-flag">{state.socket ? "✓" : " ⃠"}</span>
        <Logo />
        {state?.meta?.winner ? (
          <p>
            {`winner: ${
              state.meta.winner === 1
                ? playerBlackMeta?.player
                : playerWhiteMeta?.player
            }
            `}
          </p>
        ) : (
          <></>
        )}
        <p>Timer</p>
        <p>? Game Tree</p>
      </div>

      <div className="Game__board-container">
        <PlayerArea
          handleResignClick={handleResignClick}
          handlePassClick={handlePassClick}
          playerMeta={
            state.user &&
            playerBlackMeta.playerBlack &&
            state.user === playerBlackMeta.playerBlack
              ? playerBlackMeta
              : playerWhiteMeta
          }
          turn={state?.meta?.turn}
        />
        <Board
          dispatch={dispatch}
          game={state.active.game}
          meta={state.meta}
          user={state.user}
          board={state.board}
        />
        <PlayerArea
          handleResignClick={handleResignClick}
          handlePassClick={handlePassClick}
          playerMeta={
            state.user &&
            playerBlackMeta.playerWhite &&
            state.user === playerWhiteMeta.playerWhite
              ? playerWhiteMeta
              : playerBlackMeta
          }
          Kifu={<Kifu clickKifu={() => setShowMenu(true)} />}
          turn={state?.meta?.turn}
        />
      </div>

      <div className="Game__message-container">
        <p>Messages</p>
        <p>Message Form</p>
      </div>
    </div>
  );
};

export default Game;
