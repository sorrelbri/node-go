import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import Logo from "../../../components/Display/Logo/Logo";

const NavBar = ({ state }) => {
  return (
    <div className="NavBar" data-testid="NavBar">
      <Link to="/home">
        <div className="NavBar__logo">
          <Logo />
        </div>
      </Link>

      <Link to="/home">
        <div className="NavBar__menu-item NavBar__home">
          <p className="--link">Find a Game</p>
        </div>
      </Link>

      <Link to="/news">
        <div className="NavBar__menu-item NavBar__news">
          <p className="--link">News</p>
        </div>
      </Link>

      <Link to="/account">
        <div className="NavBar__menu-item NavBar__account">
          {state.user.username ? state.user.username : <></>}
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
