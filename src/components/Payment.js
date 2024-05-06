import React, { useState } from "react";
import { ethers } from "ethers";

const startPayment = async ({ setError, setTxs, ether, addr, setRatings, ratings, account, rating }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
    setRatings({ ...ratings, [tx.hash]: rating }); // Set rating for this transaction
  } catch (err) {
    setError(err.message);
  }
};

export default function Payment({ account }) {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [ratings, setRatings] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const rating = 0; // Initialize rating
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr"),
      setRatings,
      ratings, // Pass ratings state variable
      account,
      rating,
    });
  };

  const handleRatingChange = (txHash, rating) => {
    setRatings({ ...ratings, [txHash]: rating });
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} ratings={ratings} onRatingChange={handleRatingChange} />
        </footer>
      </div>
    </form>
  );
}

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="alert alert-error mt-5">
      <div className="flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 mx-2 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>
        <label>{message}</label>
      </div>
    </div>
  );
}

function TxList({ txs, ratings, onRatingChange }) {
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((tx) => (
        <div key={tx.hash} className="alert alert-info mt-5">
          <div className="flex-1">
            <div>Transaction Hash: {tx.hash}</div>
            <div>
              Rating: 
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => onRatingChange(tx.hash, i + 1)}
                  style={{ cursor: 'pointer', color: i < (ratings[tx.hash] || 0) ? 'gold' : 'gray' }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
