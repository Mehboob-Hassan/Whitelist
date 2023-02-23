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
