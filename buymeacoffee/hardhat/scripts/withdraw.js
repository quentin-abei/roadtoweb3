require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xD577A08a58a3DB4384dE53615F984ED6728f08F4";
  const rpc = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, rpc);

  const contract = await ethers.getContractAt("Wave", contractAddress, wallet);
  const tip = { value: ethers.utils.parseEther("0.01") };
  const buy = await contract.waveAt("Bozo", "I love your work", tip);
  console.log("someone waved at you: ", buy.hash);

  const waves = await contract.getWaves();
  const balBigInt = await rpc.getBalance(contractAddress);
  const bal = await ethers.utils.formatEther(balBigInt);
  console.log("contract balance:", bal);
  if(bal > 0.05) {
    console.log("Going to withdraw ETH from :" , contractAddress);
    const tx = await contract.withdraw();
    await tx.wait();
  } else {
    console.log("less than 0.05 ether in contract");
  }
  console.log(waves);
  printWaves(waves);
}
async function printWaves(waves) {
  for (const wave of waves) {
    console.log(wave.name);
    const time = wave.timestamp;
    const timeNormal = await ethers.utils.formatEther(time);
    console.log(timeNormal);
    console.log(wave.from);
    console.log(wave.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
