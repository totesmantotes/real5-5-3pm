import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const UserDetail = () => {
  const location = useLocation();
  const [walletHash, setWalletHash] = useState("");

  // Extract wallet hash from location state
  const { walletHash: userWalletHash } = location.state || {};

  // Update local state with user's wallet hash
  useState(() => {
    if (userWalletHash) {
      setWalletHash(userWalletHash);
    }
  }, [userWalletHash]);

  return (
    <div style={{ marginTop: "50px" }}>
      <h1>User Profile</h1>
      {walletHash && (
        <div>
          <strong>Wallet Hash:</strong> {walletHash}
        </div>
      )}
      {/* Add other user profile details here */}
    </div>
  );
};

export default UserDetail;
