import React, { useState } from "react";

export default function TxList({ txs }) {
  const [ratings, setRatings] = useState({});

  const handleRatingChange = (txHash, rating) => {
    setRatings({ ...ratings, [txHash]: rating });
  };

  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((tx, index) => (
        <div key={tx.hash} className="alert alert-info mt-5">
          <div className="flex-1">
            <div>Transaction Number: {index + 1}</div>
            <div>Transaction Hash: {tx.hash}</div>
            <div>
              Rating: 
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => handleRatingChange(tx.hash, i + 1)}
                  style={{ cursor: 'pointer', color: i < ratings[tx.hash] ? 'gold' : 'gray' }}
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
