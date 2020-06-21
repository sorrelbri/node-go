import React from "react";
import "./Kifu.scss";

const Kifu = ({ ...props }) => {
  console.log(props);
  return (
    <div className="Kifu">
      <div className="Kifu__board"></div>
    </div>
  );
};

export default Kifu;
