const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = "0xf880671b6DAcA2252D665eD30E2704bAc184B0a3"
  const uri = "ipfs://QmNcHTuS4DJjhebdJTMRSu8TVFnW2HwT84DzAfKFm9sW3T"

  const rpc = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, rpc);
  const contract = await ethers.getContractAt(
    "BobNFT",
    contractAddress,
    wallet
  );

  const BobNFT = await contract.safeMint(
    "0x052f899e4e3fe467FDF76155548ac9ef8A1d5caf",
    uri
  );


  console.log("new mint: ", BobNFT.hash);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
