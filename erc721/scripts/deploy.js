const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const BobNFT = await ethers.getContractFactory("BobNFT");
  const bobNFT = await BobNFT.deploy();
  await bobNFT.deployed();

  console.log("BobNFT deployed at address: ", bobNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
