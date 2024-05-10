import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const [gitUsers, setGitUsers] = useState([]);
  const navigate = useNavigate();

  const friendUsernames = ["totesmantotes", "antonioddrivera", "neelraj2001", "DeadW8t"];

  const getGitUsers = async () => {
    const promises = friendUsernames.map(async username => {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const userData = response.data;
      userData.walletHash = ""; // Initialize with empty string
      return userData;
    });

    const friendUserData = await Promise.all(promises);
    setGitUsers(friendUserData);
  };

  useEffect(() => {
    getGitUsers();
  }, []);

  const handleWalletHashChange = (userIndex, event) => {
    const { value } = event.target;
    setGitUsers(prevUsers =>
      prevUsers.map((user, index) =>
        index === userIndex ? { ...user, walletHash: value } : user
      )
    );
  };

  const saveWalletHash = (userIndex) => {
    // Example of saving wallet hash, replace with your actual logic
    console.log("Saving wallet hash for user at index:", userIndex);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="users-cont">
        {gitUsers.map((user, index) => (
          <div className="user-card-cont" key={user.id}>
            <img
              src={user.avatar_url}
              alt="userAvatar"
              className="user-avatar"
            />
            <span className="username">{user.login}</span>
            <div className="user-detail">
              <strong>Wallet Hash:</strong>{" "}
              {user.walletHash ? (
                <span>{user.walletHash}</span>
              ) : (
                <input
                  type="text"
                  value={user.walletHash}
                  onChange={(event) => handleWalletHashChange(index, event)}
                  placeholder="Enter Wallet Hash"
                />
              )}
              {!user.walletHash && (
                <button onClick={() => saveWalletHash(index)}>Save</button>
              )}
            </div>
            <button
              onClick={() => navigate(`/users/user/${user.login}`)}
              className="view-btn"
            >
              View User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
