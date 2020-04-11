import React from 'react';
import { Link } from 'react-router-dom';
import './Game.scss';

const GameButton = (props) => {
  const { game, dispatch, user } = props;

  const setGameDisplayData = () => {
    const gameData = {
      playerBlack: game.playerBlack,
      playerBlackRank: game.playerBlackRank,
      gameId: game.id,
    }
    if (game.open) {
      gameData.gameLinkText = 'Request to Join Game';
      gameData.playerWhite = '';
      gameData.playerWhiteRank = 'could be you!';
    }
    if (!game.open) {
      gameData.playerWhite = game.playerWhite;
      gameData.playerWhiteRank = game.playerWhiteRank;
      gameData.gameLinkText = game.winType ? 'Study Game' 
      : user ? 'Rejoin Game' : 'Watch Game' 
    }
    return gameData;
  }

  const requestJoinGame = () => {
    console.log(`request to Join Game ${game.id}!`)
    const requestAction = {
      type: 'GAMES',
      message: 'JOIN_REQUEST',
      body: {id: game.id}
    }
    dispatch(requestAction);
  }

  const renderOpenGame = () => {
    return (
      <>
        <div onClick={() => requestJoinGame()} >Request to Join Game</div>

        <div className="GameButton__player-data GameButton__player-data--black">
          <span className="GameButton__player-data__name GameButton__player-data__name--black">{game.playerBlack}</span>
          <span className="GameButton__player-data__rank GameButton__player-data__rank--black">{game.playerBlackRank}</span>
        </div>
      </>
    )
  }

  const renderGame = () => {
    const {
      gameLinkText,
      playerBlack,
      playerBlackRank,
      gameId,
      playerWhite,
      playerWhiteRank
    } = setGameDisplayData();
    return (
      <>
        <div className="GameButton__seat GameButton__seat--black">

        </div>
        
        <div className="GameButton__table">
          <div className="GameButton__table__meta">
            <div 
              className="GameButton__player-data GameButton__player-data--black"
              >
              <span 
                className="GameButton__player-data__name GameButton__player-data__name--black"
                >{playerBlack}</span>
              <span 
                className="GameButton__player-data__rank GameButton__player-data__rank"
                >{playerBlackRank}</span>
            </div>
            
            <Link 
              className="GameButton__link"
              to={`/games/${gameId}`}
              >{gameLinkText}</Link>

              <div 
                className={`GameButton__player-data GameButton__player-data--white ${
                    playerWhite ? '' : 'GameButton__player-data--invisible'
                  }`
                }
              >
                <span 
                  className="GameButton__player-data__name GameButton__player-data__name--white"
                  >{playerWhite}</span>
                <span 
                  className="GameButton__player-data__rank GameButton__player-data__rank--white"
                  >{playerWhiteRank}</span> 
            </div>
          </div>

          <div className="GameButton__table__image">
            <div className="table__player-area table__player-area--black">
              <div className="table__player-bowl table__player-bowl--black"></div>
            </div>
            <div className="table__game-board">
              <div className="table__game-board--grid"></div>
            </div>
            <div className="table__player-area table__player-area--white">
              <div className="table__player-bowl table__player-bowl--white"></div>
            </div>
          </div>
        </div>

        <div className="GameButton__seat GameButton__seat--white">

        </div>

      </>
    )
  }

  return (
    <div className="GameButton" data-testid="GameButton">
      {renderGame()}
    </div>
  );
}

export default GameButton;