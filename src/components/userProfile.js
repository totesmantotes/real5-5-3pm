import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

const UserProfile = () => {
  const [gitUserData, setGitUserData] = useState({});
  const [totalRating, setTotalRating] = useState(0);
  const { username } = useParams();

  useEffect(() => {
    const getGitUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        console.log("USER IS HERE", response.data);
        setGitUserData(response.data);
        calculateTotalRating(response.data); // Calculate total rating
      } catch (error) {
        console.error(error);
      }
    };

    getGitUser();
  }, [username]);

  // Function to calculate total rating
  const calculateTotalRating = (userData) => {
    // Logic to calculate total rating from transaction hashes
    let total = 0;
    // Assume transactionHashes is an array of transaction hashes
    // associated with the user's ratings
    for (const hash of userData.transactionHashes) {
      // Fetch rating from transaction hash and add it to total
      // For example:
      // const rating = fetchRatingFromTransaction(hash);
      // total += rating;
    }
    setTotalRating(total);
  };

  return (
    <div className="user-profile-main-cont">
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
          <h3 className="location">{gitUserData.location}</h3>
          <div className="follow-cont">
            <span className="total-rating">
              <strong>Total Rating:</strong> {totalRating}
            </span>
            <span className="following">
              <strong>Following:</strong> {gitUserData.following}
            </span>
            <span className="reputation-score">
              <strong>Reputation Score:</strong> {gitUserData.reputationScore || 0}
            </span>
          </div>
          <a
            className="view-ongit-a"
            href={gitUserData.html_url}
            target="_blank"
            rel="noreferrer"
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

export default UserProfile;
