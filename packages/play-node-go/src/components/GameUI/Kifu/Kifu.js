import React from "react";
import "./Kifu.scss";

const Kifu = () => {
  const handleClick = (e) => {
    console.log("clicked");
  };

  return (
    <div className="Kifu">
      <p className="Kifu__show-menu" onClick={handleClick}>
        Show Menu?
      </p>
      <div className="Kifu__board"></div>
    </div>
  );
};

export default Kifu;
