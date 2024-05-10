// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SocialExchange {
    uint256 constant POST_EXPIRATION_TIME = 15 minutes;

    struct Post {
        address owner;
        string content;
        uint256 timestamp;
    }

    Post[] public posts;
    mapping(address => bool) public registeredUsers;

    event PostCreated(address indexed owner, uint256 postId, string content, uint256 timestamp);

    constructor() {
        // Register the contract deployer as a user
        registeredUsers[msg.sender] = true;
    }

    modifier onlyRegisteredUser() {
        require(registeredUsers[msg.sender], "User is not registered");
        _;
    }

    function registerUser() external {
        registeredUsers[msg.sender] = true;
    }

    function createPost(string memory _content) external onlyRegisteredUser {
        posts.push(Post({
            owner: msg.sender,
            content: _content,
            timestamp: block.timestamp
        }));
        emit PostCreated(msg.sender, posts.length - 1, _content, block.timestamp);
    }

    function getPostCount() external view returns (uint256) {
        return posts.length;
    }

    function getPost(uint256 _index) external view returns (address, string memory, uint256) {
        require(_index < posts.length, "Post does not exist");
        Post memory post = posts[_index];
        return (post.owner, post.content, post.timestamp);
    }

    function getRecentPosts() external view returns (address[] memory, string[] memory, uint256[] memory) {
        uint256[] memory recentPostsIndices = new uint256[](posts.length);
        uint256 count = 0;
        for (uint256 i = 0; i < posts.length; i++) {
            if (block.timestamp - posts[i].timestamp <= POST_EXPIRATION_TIME) {
                recentPostsIndices[count] = i;
                count++;
            }
        }
        address[] memory owners = new address[](count);
        string[] memory contents = new string[](count);
        uint256[] memory timestamps = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            uint256 index = recentPostsIndices[i];
            owners[i] = posts[index].owner;
            contents[i] = posts[index].content;
            timestamps[i] = posts[index].timestamp;
        }
        return (owners, contents, timestamps);
    }
}
