import React from "react";
import "./Kifu.scss";

const Kifu = ({ clickKifu }) => {
  return (
    <div className="Kifu">
      <p className="Kifu__show-menu" onClick={clickKifu}>
        Show Menu?
      </p>
      <div className="Kifu__board"></div>
    </div>
  );
};

export default Kifu;
