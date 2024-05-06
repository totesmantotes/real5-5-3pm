import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  // State management
  const [gitUsers, setGitUsers] = useState([]);
  const navigate = useNavigate();

  // Array of GitHub usernames for your friends
  const friendUsernames = ["totesmantotes", "antonioddrivera", "neelraj2001", "DeadW8t"];

  const getGitUsers = async () => {
    // Fetch details for each friend user
    const promises = friendUsernames.map(username =>
      axios.get(`https://api.github.com/users/${username}`)
    );

    // Wait for all requests to complete
    const responses = await Promise.all(promises);
    
    // Extract data from each response
    const friendUserData = responses.map(response => response.data);

    // Update state with friend user data
    setGitUsers(friendUserData);

    return friendUserData;
  };

  useEffect(() => {
    getGitUsers().catch((e) => console.error(e));
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="users-cont">
        {gitUsers.map((user) => (
          <div className="user-card-cont" key={user.id}>
            <img
              src={user.avatar_url}
              alt="userAvatar"
              className="user-avatar"
            />
            <span className="username">{user.login}</span>
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