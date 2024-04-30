import React from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const connectedAccount = ethers.utils.getAddress(accounts[0]);
      setAccount(connectedAccount);
    } catch (error) {
      console.error('Error connecting account:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="nav__brand">
        <h1>Soshal Exchange</h1>
      </div>
      <div className="nav__links">
        {account ? (
          <Link to="/dappcord" className="nav__link">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </Link>
        ) : (
          <button type="button" className="nav__button" onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
