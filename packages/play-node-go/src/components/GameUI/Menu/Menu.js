import React from "react";
import "./Menu.scss";

const Menu = ({ showMenu, clickClose, ...props }) => {
  const handleBackgroundClick = (e) => {
    if (e.target.className === "Game__Menu-container") clickClose();
  };

  if (!showMenu) return <></>;
  return (
    <div
      className="Game__Menu-container"
      onClick={(e) => handleBackgroundClick(e)}
    >
      <div className="Game__Menu-container__Menu">
        <button onClick={clickClose}>X</button>
      </div>
    </div>
  );
};

export default Menu;
