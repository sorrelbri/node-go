import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import Logo from '../../../components/Display/Logo/Logo';

const NavBar = (props) => {

  return (
    <div className="NavBar" data-testid="NavBar">
      <Link to="/home" >
        <div className="NavBar__logo"><Logo /></div>
      </Link>

      <Link to="/home" >
        <div className="NavBar__menu-item NavBar__home">Find a Game</div>
      </Link>
      
      <Link to="/news">
        <div className="NavBar__menu-item NavBar__news">News</div>
      </Link>

      <Link to="/account">
        <div className="NavBar__menu-item NavBar__acount">{props.user ? props.user.username : <></>}</div>
      </Link>
    </div>
  );
}

export default NavBar;