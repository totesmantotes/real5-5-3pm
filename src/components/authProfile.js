import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AuthProfile.css"; // Import custom CSS for styling

const AuthProfile = ({ username }) => {
  const [gitUserData, setGitUserData] = useState({});
  const [walletHash, setWalletHash] = useState("");
  const [totalRating, setTotalRating] = useState(0);
  const [walletHashes, setWalletHashes] = useState([]);

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

  useEffect(() => {
    // Calculate total rating from transaction ratings
    const transactionRatings = [1, 2, 3, 4, 5]; // Example transaction ratings
    const sum = transactionRatings.reduce((acc, rating) => acc + rating, 0);
    setTotalRating(sum);
  }, []); // This effect runs once to calculate the total rating

  // Function to handle wallet hash input change
  const handleWalletHashChange = (event) => {
    const { value } = event.target;
    setWalletHash(value);
  };

  // Function to save wallet hash to the user and add it to the array
  const saveWalletHash = () => {
    setGitUserData({ ...gitUserData, walletHash });
    setWalletHashes([...walletHashes, walletHash]);
    setWalletHash(""); // Clear the input field after saving
  };

  return (
    <div className="user-profile-main-cont">
      <h2 className="profile-heading">Username/Account Address</h2>
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
              <strong>Wallet Hash:</strong>{" "}
              {gitUserData.walletHash ? (
                <span>{gitUserData.walletHash}</span>
              ) : (
                <input
                  type="text"
                  value={walletHash}
                  onChange={handleWalletHashChange}
                  placeholder="Enter Wallet Hash"
                />
              )}
              {!gitUserData.walletHash && (
                <button onClick={saveWalletHash}>Save</button>
              )}
            </span>
            <span className="user-detail">
              <strong>Public Repos:</strong> {gitUserData.public_repos}
            </span>
          </div>
          <h3 className="location">{gitUserData.location}</h3>
          <div className="follow-cont">
            <span className="followers">
              <strong>Total Rating:</strong> {totalRating}
            </span>
            <span className="following">
              <strong></strong> {gitUserData.following}
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
