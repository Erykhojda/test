import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import GoogleButton from "./GoogleButton";


const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>

      <nav className="navbar">
        <div className="navbar-container container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>

            Recipe
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <CloseIcon color="primary" fontSize="large" /> : <MenuIcon color="primary" fontSize="large" />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " activated" : "")
                }
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/createrecipe"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " activated" : "")
                }
                onClick={closeMobileMenu}
              >
                CreateRecipe
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/recipes"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " activated" : "")
                }
                onClick={closeMobileMenu}
              >
                Recipes
              </NavLink>
            </li>
            <GoogleButton />
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;