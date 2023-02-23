require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: 'goerli',
  networks: {
    hardhat: {},
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/Yb8NBOvZo94MAW8o9HyO2hJ-bSsxZrYl',
      accounts : ['a50737d6641bf3269281273c683278e2fa2144112a4f55be6a7937d7c821703a']
    }
  }
};

// 0x6BbA935140702b5aCE1EEcCCB38106Fd24Ac6149
// Deployed on Goerli