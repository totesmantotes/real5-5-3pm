import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const RepoList = () => {
  return (
    <div>
      <h1>Welcome to Soshal Exchange!</h1>
      <h2>This is a web-based Discorb/Venmo application <br></br> used to transfer etherum to your friends</h2>
      <h3>Please use one of the above links to navigate our site</h3>
    </div>
  );
};

export default RepoList;