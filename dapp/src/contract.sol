pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";

contract MapStore is Ownable {
    struct UserData {
        string name;
        address collection;
        string network;
        string paymentId;
        string date;
        string transactionId;
    }
    
    mapping (address => UserData[]) public storedValues;
    mapping (address => uint) public updateCounts;

    function addValue(address key, string memory name, address collection, string memory network, string memory paymentId, string memory date, string memory transactionId) public {
        require(msg.sender == owner(), "Only the contract owner can add values.");
        storedValues[key].push(UserData(name, collection, network, paymentId, date, transactionId));
        updateCounts[key]++;
    }

    function get(address key) public view returns (string[] memory, address[] memory, string[] memory, string[] memory, string[] memory) {
        uint count = updateCounts[key];
        string[] memory names = new string[](count);
        address[] memory collections = new address[](count);
        string[] memory networks = new string[](count);
        string[] memory paymentIds = new string[](count);
        string[] memory dates = new string[](count);
        for (uint i = 0; i < count; i++) {
            UserData memory data = storedValues[key][i];
            names[i] = data.name;
            collections[i] = data.collection;
            networks[i] = data.network;
            paymentIds[i] = data.paymentId;
            dates[i] = data.date;
        }
        return (names, collections, networks, paymentIds, dates);
    }
}
