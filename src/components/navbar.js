import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles.css";
import Navigation from "./Navigation"; // Import Navigation component

const Navbar = ({ isLogged }) => {
  return (
    <div className="sidebar">
      <Navigation /> {/* Include the Navigation component */}
      <div className="link-cont">
        <Link to={"/"}>Welcome</Link>
        <Link to={"/users"}>Friends</Link>
        <Link to={"/search"}>Search</Link>
        <Link to={"/authProfile"}>Profile</Link>
        <Link to={"/dappcord"}>Chat</Link>
        {/* Remove the following line to remove the Connect Button */}
        {/* {!isLogged && <Link to={"/login"}>Login</Link>} */}
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;

