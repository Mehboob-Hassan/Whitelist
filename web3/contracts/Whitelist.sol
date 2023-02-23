// SPDX-License-Identifier: UNLICENSED
pragma solidity  ^0.8.9;

contract Whitelist {
    uint8 public whitelistNum;
    mapping(address=>bool) public whitelistedAdresses;
    uint public maxNumWhitelisted;
    address public owner;

    constructor(uint _maxNumWhitelisted){
        maxNumWhitelisted = _maxNumWhitelisted;
        owner = msg.sender;
    }
    
    function addToWhitelist() payable public{
        require(!whitelistedAdresses[msg.sender], "Already Whitelisted");
        require(whitelistNum < maxNumWhitelisted, "Limit Reached");
        whitelistedAdresses[msg.sender] = true;
        whitelistNum += 1;
    }
}