import { useState, useRef, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { Contract, providers } from 'ethers'
import { WHITELIST_CONTRACT, abi } from './constants'
import './App.css'

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [numWhitelisted, setNumWhitelisted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const web3ModalRef = useRef();
  // GET PROVIDER OR SIGNER
  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      // If user is not connected to the Goerli network, let them know and throw an error
      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 97) {
        window.alert("Change the network to BCB");
        throw new Error("Change network to BCB");
      }


      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (error) {
      console.log(error)
    }
  }


  //  -------------JOIN THE WHITELIST-----------\
  const joinWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(WHITELIST_CONTRACT, abi, signer);

      const txsn = await contract.addToWhitelist();
      setIsLoading(true);
      await txsn.wait()
      setIsLoading(false);
      window.alert("You have been added in Whitelist")
    } catch (error) {
      console.log(error)
    }
  }


  // ---------- GET WHITELISTED-----------
  const checkIfAddressInWhitelist = async () => {
    try {
      // get provider
      const signer = await getProviderOrSigner(true);
      const whiteCont = new Contract(WHITELIST_CONTRACT, abi, signer);

      const address = await signer.getAddress();
      const check = await whiteCont.whitelistedAdresses(address);
      console.log(check)
      setIsWhitelisted(check);
    } catch (error) {
      console.log(error);
    }
  }


  // --------GET NUMBER OF WHITELISTED---------
  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const whitelistContract = new Contract(WHITELIST_CONTRACT, abi, provider);
      // call the numAddressesWhitelisted from the contract
      const _numberOfWhitelisted = await whitelistContract.whitelistNum();
      setNumWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };


  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressInWhitelist();
      getNumberOfWhitelisted();

    } catch (error) {
      console.log("Error in connect wallet: ", error)
    }
  }

  useEffect(() => {

    console.log(numWhitelisted)
    console.log(isWhitelisted)
    if (!walletConnected) {
      try {
        web3ModalRef.current = new Web3Modal({
          network: 'goerli',
          providerOptions: {},
          disableInjectedProvider: false
        })
        connectWallet();
        console.log(numWhitelisted)
      } catch (error) {
        console.log(error)
      }
    }

  }, [])


  //-------------- RENDER BUTTON----------
  const renderButton = () => {
    try {
      if (walletConnected) {
        if (isWhitelisted) {
          return (
            <div className="description">
              Thanks for joining the Whitelist!
            </div>
          );
        } else if (isLoading) {
          return <button className="button">Loading...</button>;
        } else {
          return <button onClick={joinWhitelist} className="button">Join Whitelist</button>
        }
      } else {
        return <button onClick={connectWallet} className="button">Connect To Wallet</button>
      }
    } catch (error) {
      console.log("Error in render Button: ", error)
    }
  }


  return (
    <div>
      <div className="main">
        <div>
          <h1 className="title">Welcome to Crypto Devs!</h1>
          <div className="description">
            Its an NFT collection for developers in Crypto.
          </div>
          <div className="description">
            {numWhitelisted} have already joined the Whitelist
          </div>
          {renderButton()}
        </div>
        <div>
          <img className="image" src="./crypto-devs.svg" />
        </div>
      </div>

      <footer className="footer">
        Made with &#10084; by MH
      </footer>
    </div>
  );
}

export default App
