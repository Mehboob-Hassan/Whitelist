require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: 'goerli',
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.HTTP_URL,
      accounts : [process.env.PRIVATE_KEY]
    }
  }
};

// 0x6BbA935140702b5aCE1EEcCCB38106Fd24Ac6149
// Deployed on BNB