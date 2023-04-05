
# Whitelist DApp

This is Ethereum Blockchain Based Whitelist DApp. This app is prequel of my others DAPPs ICO and NFT-Marketplace.


## Demo

https://my-whitelist.netlify.app/


## Authors

- [@Mehboob-Hassan](https://github.com/Mehboob-Hassan)


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

### Go to the web3 directory for Blockchain side Setup

```bash
  cd web3
```
Install dependencies

```bash
  npm install
```

Make .env file at this dir

```bash
  echo > ".env"
```
(In .env File)
  + Add private key of you metamask wallet 
  + Make an endpoint on Quicknode and paste link here
  PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE_"
  HTTP_URL = 'YOUR_QUICKNODE_ENDPOINT_HTTP_LINK_HERE'


Compile contract

```bash
  hardhat compile
```

Deploy contract

```bash
  npm hardhat run --network goerli scripts/deploy.js
```

(Now copy address You got in Terminal)


### Now setup Client side
```bash
  cd ../client
```

Install dependencies

```bash
  npm install
```

Replace the address in:  client/src/constants/index.js
export const WHITELIST_CONTRACT = 'REPLACE ADDRESS HERE WITH YOURS';

#### You Have all Done Now run the project

```bash
  npm run dev
```

### Follow link you got in Terminal