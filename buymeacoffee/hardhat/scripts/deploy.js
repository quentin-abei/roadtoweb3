require("dotenv").config();

async function main() {
  const Wave = await ethers.getContractFactory("Wave");
  const wave = await Wave.deploy();
  await wave.deployed();
  console.log("wave deployed at address: ", wave.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
