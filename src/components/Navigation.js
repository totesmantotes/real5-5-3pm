import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navigation = ({ account, setAccount }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectHandler = async () => {
    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const connectedAccount = ethers.utils.getAddress(accounts[0]);
      setAccount(connectedAccount);
// Set the user as logged in after connecting
    } catch (error) {
      console.error('Error connecting account:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <nav>
      <div className='nav__brand'>
        <h1>Soshal Exchange</h1>
      </div>

      {account ? (
        <Link to="/dappcord" className='nav__link'> {/* Use Link component to navigate */}
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </Link>
      ) : (
        <button type="button" className='nav__button' onClick={connectHandler} disabled={isConnecting}>
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      )}
    </nav>
  );
};

export default Navigation;
