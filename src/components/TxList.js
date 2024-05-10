// TxList component
import React from "react";

const TxList = ({ txs, ratings, onRatingChange }) => {
  return (
    <div>
      <h3>Transaction List</h3>
      <ul>
        {txs.map((tx) => (
          <li key={tx.txHash}>
            <div>Transaction Hash: {tx.txHash}</div>
            {/* Display rating UI */}
            <div>
              Rating: {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => onRatingChange(tx.txHash, i + 1)}
                  style={{ cursor: 'pointer', color: i < (ratings[tx.txHash] || 0) ? 'gold' : 'gray' }}
                >
                  ★
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TxList;
