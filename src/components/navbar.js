import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles.css";

const Navbar = ({ isLogged }) => {
  return (
    <>
      <nav>
        <Link to={"/"} className="logo-nav">
          Git Explorer
        </Link>
        <div className="link-cont">
          <Link to={"/"}>Welcome</Link>
          <Link to={"/users"}>Friends</Link>
          <Link to={"/search"}>Search</Link>
          <Link to={"/authProfile"}>Profile</Link>
          <Link to={"/dappcord"}>Chat</Link>
          <Link to={"/payment"}>Payment</Link> {/* Add link to the Payment component */}
          {!isLogged && <Link to={"/login"}>Login</Link>}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
