async function main() {
  const Lock = await hre.ethers.getContractFactory("Whitelist");
  const lock = await Lock.deploy('10');

  await lock.deployed();

  console.log("Contract Deployed on Addr: ", lock.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// 0x13F8afEd1306451FED491C81C590812c9DA041b3
// Deployed on Goerli Testnet