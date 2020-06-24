import React, { useEffect, useRef } from "react";
import "./Menu.scss";

const Menu = ({ showMenu, clickClose, ...props }) => {
  const { active, meta } = props.state; // active.game.boardSize, meta.gameRecord
  const boardSize = active.game.boardSize;
  const handleBackgroundClick = (e) => {
    if (e.target.className === "Game__Menu-container") clickClose();
  };
  const canvasRef = useRef();
  const drawGameRecord = () => {
    return <canvas ref={canvasRef} />;
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
    meta.gameRecord.forEach(({ player, pos }, index) => {
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
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        index + 1,
        (pos.y - 1) * space + offset,
        (pos.x - 1) * space + offset
      );
    });
  }, [showMenu, meta]);

  return (
    <div
      className={`Game__Menu-container${showMenu ? "" : "--hidden"}`}
      onClick={(e) => handleBackgroundClick(e)}
    >
      <div className="Game__Menu-container__Menu">
        <button onClick={clickClose}>X</button>
        <div className="Game__Menu__game-record-container">
          {drawGameRecord()}
          <div className="Game__Menu__game-record-overflow"></div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
