// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionRating {
    // Struct to store rating data
    struct Rating {
        address rater;  // Address of the user who submitted the rating
        uint256 rating; // Rating value (e.g., 1 to 5 stars)
    }

    // Mapping to store ratings for each transaction hash
    mapping(bytes32 => Rating[]) public transactionRatings;

    // Function to submit a rating for a transaction
    function rateTransaction(bytes32 txHash, uint256 rating) external {
        require(rating >= 1 && rating <= 5, "Invalid rating value");
        
        transactionRatings[txHash].push(Rating(msg.sender, rating));
    }

    // Function to get the average rating for a transaction
    function getAverageRating(bytes32 txHash) external view returns (uint256) {
        Rating[] storage ratings = transactionRatings[txHash];
        uint256 totalRating = 0;
        
        for (uint256 i = 0; i < ratings.length; i++) {
            totalRating += ratings[i].rating;
        }

        if (ratings.length > 0) {
            return totalRating / ratings.length;
        } else {
            return 0;
        }
    }
}
