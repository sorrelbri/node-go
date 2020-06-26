import React, { useEffect, useRef } from "react";
import "./Menu.scss";

const Menu = ({ showMenu, clickClose, ...props }) => {
  const { active, meta } = props.state; // active.game.boardSize, meta.gameRecord
  const boardSize = active.game.boardSize;
  const handleBackgroundClick = (e) => {
    if (e.target.className === "Game__Menu-container") clickClose();
  };
  const canvasRef = useRef();
  const overflowRef = useRef();
  const drawGameRecord = () => {
    return (
      <>
        <canvas ref={canvasRef} />
        <canvas ref={overflowRef} />
      </>
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = Math.min(window.innerWidth * 0.75, 500);
    canvas.height = scale;
    canvas.width = scale;
    const space = scale / boardSize;
    const offset = space / 2;
    for (let i = 0; i < boardSize; i++) {
      const start = i * space + offset;
      const end = scale - offset;
      ctx.beginPath();
      ctx.moveTo(start, offset);
      ctx.lineTo(start, end);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset, start);
      ctx.lineTo(end, start);
      ctx.closePath();
      ctx.stroke();
    }
    if (!meta?.gameRecord) return;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const { overflow } = meta.gameRecord.reduce(
      (dict, { player, pos }, index) => {
        const past = dict[`${pos.x}-${pos.y}`];
        if (past) {
          // overflow: [ { move:#, player:'color', subsequentMoves: [ { move: #, player: 'color' } ] } ]
          if (dict.overflow) {
            const indexOfPrior = dict.overflow.findIndex(
              ({ move }) => move === past
            );
            if (indexOfPrior !== -1) {
              // if multiple past moves at this point exist
              dict.overflow[indexOfPrior].subsequentMoves.push({
                move: index + 1,
                player,
              });
              return dict;
            }
            // if a second move at this point has not yet been encountered
            // prior move will be black if no active handicap and move is odd or if active handicap and move is even
            const playerPrior =
              (active.handicap && !(past % 2)) || past % 2 ? "black" : "white";
            return {
              ...dict,
              overflow: [
                ...dict.overflow,
                {
                  move: past,
                  player: playerPrior,
                  subsequentMoves: [{ move: index + 1, player }],
                },
              ],
            };
          }
          // if no move has yet been encountered at a previously made move
          return {
            ...dict,
            overflow: [
              { move: past, subsequentMoves: [{ move: index + 1, player }] },
            ],
          };
        }
        ctx.beginPath();
        ctx.arc(
          (pos.y - 1) * space + offset,
          (pos.x - 1) * space + offset,
          offset * 0.95,
          0,
          Math.PI * 2,
          true
        );
        ctx.stroke();
        ctx.fillStyle = player === "white" ? "#fff" : "#000";
        ctx.fill();
        ctx.fillStyle = player === "white" ? "#000" : "#fff";

        ctx.fillText(
          index + 1,
          (pos.y - 1) * space + offset,
          (pos.x - 1) * space + offset
        );
        return { ...dict, [`${pos.x}-${pos.y}`]: index + 1 };
      },
      {}
    );
    if (!overflow?.length) return;
    // Draw Overflow Moves (moves made at prior points)
    const canvas2 = overflowRef.current;
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = scale;
    canvas2.height = space * overflow.length;
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";
    overflow.forEach(({ move, subsequentMoves, player }, index) => {
      subsequentMoves.forEach(({ player, move }, subIndex) => {
        ctx2.beginPath();
        ctx2.arc(
          subIndex * space + offset,
          index * space + offset,
          offset * 0.95,
          0,
          Math.PI * 2,
          true
        );
        ctx2.stroke();
        ctx2.fillStyle = player === "white" ? "#fff" : "#000";
        ctx2.fill();
        ctx2.fillStyle = player === "white" ? "#000" : "#fff";
        ctx2.fillText(move, subIndex * space + offset, index * space + offset);
      });
      ctx2.fillStyle = "#000";
      ctx2.fillText(
        "at",
        subsequentMoves.length * space + offset,
        index * space + offset
      );
      ctx2.fillStyle = player === "white" ? "#fff" : "#000";
      ctx2.beginPath();
      ctx2.arc(
        (subsequentMoves.length + 1) * space + offset,
        index * space + offset,
        offset * 0.95,
        0,
        Math.PI * 2,
        true
      );
      ctx2.fill();
      ctx2.stroke();
      ctx2.fillStyle = player === "white" ? "#000" : "#fff";
      ctx2.fillText(
        move,
        (subsequentMoves.length + 1) * space + offset,
        index * space + offset
      );
    });
  }, [showMenu, meta, active.handicap, boardSize]);

  return (
    <div
      className={`Game__Menu-container${showMenu ? "" : "--hidden"}`}
      onClick={(e) => handleBackgroundClick(e)}
    >
      <div className="Game__Menu-container__Menu">
        <button onClick={clickClose}>X</button>
        <div className="Game__Menu__game-record-container">
          {drawGameRecord()}
        </div>
      </div>
    </div>
  );
};

export default Menu;
