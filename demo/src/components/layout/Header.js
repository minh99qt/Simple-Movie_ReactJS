import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header flex items-center justify-center text-white text-[23px] gap-x-5 py-5 mb-5 uppercase font-bold tracking-wider">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "none")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
