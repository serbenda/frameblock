// SPDX-License-Identifier: MIT
// Specifies the license under which the contract is published.
pragma solidity ^0.8.0;

// Import the Ownable contract from OpenZeppelin.
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";

contract MapStore is Ownable {
    // Define a struct to hold user data.
    struct UserData {
        string name;
        address collection;
        string network;
        string paymentId;
        string date;
        string transactionId;
    }

    // A mapping from addresses to arrays of UserData structs.
    mapping (address => UserData[]) public storedValues;
    // A mapping from addresses to the number of times they've been updated.
    mapping (address => uint) public updateCounts;

    // A function to add a new UserData struct to the storedValues mapping.
    function addValue(address key, string memory name, address collection, string memory network, string memory paymentId, string memory date, string memory transactionId) public {
        // Only the contract owner can add values.
        require(msg.sender == owner(), "Only the contract owner can add values.");
        // Add the new struct to the array and increment the update count.
        storedValues[key].push(UserData(name, collection, network, paymentId, date, transactionId));
        updateCounts[key]++;
    }

    // A function to get an array of UserData structs for a given address.
    function get(address key) public view returns (string[] memory, address[] memory, string[] memory, string[] memory, string[] memory) {
        uint count = updateCounts[key];
        string[] memory names = new string[](count);
        address[] memory collections = new address[](count);
        string[] memory networks = new string[](count);
        string[] memory paymentIds = new string[](count);
        string[] memory dates = new string[](count);
        // Loop through the storedValues array and extract the relevant fields.
        for (uint i = 0; i < count; i++) {
            UserData memory data = storedValues[key][i];
            names[i] = data.name;
            collections[i] = data.collection;
            networks[i] = data.network;
            paymentIds[i] = data.paymentId;
            dates[i] = data.date;
        }
        // Return the arrays of fields.
        return (names, collections, networks, paymentIds, dates);
    }
}
