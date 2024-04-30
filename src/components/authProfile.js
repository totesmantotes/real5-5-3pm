import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AuthProfile.css"; // Import custom CSS for styling

const AuthProfile = ({ username }) => {
  const [gitUserData, setGitUserData] = useState({});

  useEffect(() => {
    const getGitUser = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        console.log("USER IS HERE", response.data);
        setGitUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getGitUser();
  }, [username]); // Dependency added to useEffect to fetch data when username changes

  return (
    <div className="user-profile-main-cont">
      <h2 className="profile-heading">YOUR PROFILE</h2>
      <div className="top-cont">
        {gitUserData.avatar_url && (
          <img
            src={gitUserData.avatar_url}
            className="user-avatar-img"
            alt="user-img"
          />
        )}
        <div className="name-cont">
          <span className="username">{gitUserData.login}</span>
          <h2 className="name">{gitUserData.name}</h2>
          <div className="user-details">
            <span className="user-detail">
              <strong>Company:</strong>{" "}
              {gitUserData.company || "Not available"}
            </span>
            <span className="user-detail">
              <strong>Public Repos:</strong> {gitUserData.public_repos}
            </span>
          </div>
          <h3 className="location">{gitUserData.location}</h3>
          <div className="follow-cont">
            <span className="followers">
              <strong>Followers:</strong> {gitUserData.followers}
            </span>
            <span className="following">
              <strong>Following:</strong> {gitUserData.following}
            </span>
          </div>
          <a
            className="view-ongit-a"
            href={gitUserData.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div className="bottom-cont">
        <h3 className="bio">{gitUserData.bio}</h3>
      </div>
    </div>
  );
};

export default AuthProfile;
