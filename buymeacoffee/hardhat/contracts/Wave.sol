// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Wave {
    // 0xD577A08a58a3DB4384dE53615F984ED6728f08F4
    struct WaveMemo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    event NewWave(
        address waver,
        uint256 time,
        string name,
        string message
    );

    WaveMemo[] waves;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function getWaves() public view  returns (WaveMemo[] memory) {
        return waves;
    }
    
    function waveAt
    (
        string memory _name,
        string memory _message
        ) public payable {
       require(msg.value >= 0.01 ether, "Coffee is not free");
       waves.push(WaveMemo(
        msg.sender,
        block.timestamp,
        _name,
        _message
       ));
       emit NewWave(
        msg.sender,
        block.timestamp,
        _name,
        _message
       );
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "something went wrong");
    }

}
