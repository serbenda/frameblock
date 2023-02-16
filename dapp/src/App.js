import React, { useState, useEffect } from 'react'
import loadingIcon from './loadingIcon.gif';
import  { create}from 'ipfs-http-client'
import Web3 from 'web3';
import { Button } from 'react-bootstrap';
import TextField from './TextField';
import { ethers } from 'ethers'
import VConsole from 'vconsole'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';
import './style.css';
import {
  initWeb3Onboard,
} from './services'
import {
  useAccountCenter,
  useConnectWallet,
  useNotifications,
  useSetChain,
  useWallets,
  useSetLocale
} from '@web3-onboard/react'
import './App.css'
import Header from './views/Header/Header.js'
import Footer from './views/Footer/Footer.js'



let provider



const App = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cid, setCid] = useState('');
  const [price, setPrice] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState(null);
  const [deploymentStatusPro, setDeploymentStatusPro] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [network, setNetwork] = useState(null);
  const [payment, setPayment] = useState(null);
  const [address,setAddress] = useState(null);
  const [collections, setCollections] = useState(null);
  const [gasPrice,setgasPrice] = useState(null);

    const [collectionName, setCollectionName] = useState('My Collection (Click to change)');
    const [isEditing, setIsEditing] = useState(false);
  
    const handleClick = () => {
      setIsEditing(true);
    };
  
    const handleBlur = () => {
      setIsEditing(false);
    };
  
    const handleChange2 = (event) => {
      setCollectionName(event.target.value);
    };

    const renderNotifySettings = () => {
      return (
        <div className={'conditional-ui-settings'}>

<h3>Your Collections</h3>
<div>
  {collections ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {collections
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((item, index) => (
          <div key={index} style={{ display: "block" }}>
            <p>{item.collectionName}</p>
            <p style={{ color: "gray", fontSize: "12px" }}>
              Deployed in {item.network} on {item.date}{" "}
            </p>
            <a key={index} href={`https://testnets.opensea.io/es/collection/${item.collectionName}`}>
              <p>
                <i>Check it on Collections Markets!</i>
              </p>
              <br />
            </a>
          </div>
        ))}
    </div>
  ) : (
    <p>No collections found</p>
  )}
</div>


        </div>
      )
    }
  


const CURRENCY = 'USD';

const chainsinfo =   {'Ethereum' : {
  id: '0x1',
  token: 'ETH',
  label: 'Ethereum',
  rpcUrl: 'https://rpc.ankr.com/eth'},
'Mumbai' : {
  id: '0x13881',
  token: 'MATIC',
  label: 'Polygon - Mumbai',
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/'},
'Binance' : {
  id: '0x38',
  token: 'BNB',
  label: 'Binance',
  rpcUrl: 'https://bsc-dataseed.binance.org/'},
  'BinanceTestnet' : {
    id: '0x96',
    token: 'BNB',
    label: 'Testnet',
    rpcUrl: 'ws://95.217.146.48:9546/'},
'Polygon' : 
{
  id: '0x89',
  token: 'MATIC',
  label: 'Polygon',
  rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
},'Fantom' : {

  id: '0xfa',
  token: 'FTM',
  label: 'Fantom',
  rpcUrl: 'https://rpc.ftm.tools/'
},'Optimism': {

  id: 10,
  token: 'OETH',
  label: 'Optimism',
  rpcUrl: 'https://mainnet.optimism.io'
},'Arbitrum': {

  id: 42161,
  token: 'ARB-ETH',
  label: 'Arbitrum',
  rpcUrl: 'https://rpc.ankr.com/arbitrum'
}}

const web3bc = new Web3(new Web3.providers.WebsocketProvider("ws://95.217.146.48:9546"));


const contractAddress = "0x97683A3Fe01088666BA7898F5E88A6bB4E0E437B";
//const contractAddress = "0x1F5FFaa369a567353009f5c1B48363F9D4E31F23";
const mapstoreContract = new web3bc.eth.Contract([{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"key","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"string","name":"network","type":"string"},{"internalType":"string","name":"paymentId","type":"string"},{"internalType":"string","name":"date","type":"string"},{"internalType":"string","name":"transactionId","type":"string"}],"name":"addValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"key","type":"address"}],"name":"get","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"storedValues","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"string","name":"network","type":"string"},{"internalType":"string","name":"paymentId","type":"string"},{"internalType":"string","name":"date","type":"string"},{"internalType":"string","name":"transactionId","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"updateCounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],contractAddress);


const fromDollarToCent = amount => parseInt(amount * 100);

const successPayment = data => {
  alert('Payment Successful');
  
};

const errorPayment = async data => {
  const pay = Math.floor(10000000 + Math.random() * 90000000)
  setPayment(pay)
  alert('Accepted, Your Payment id is ' +  pay );
  //setCid(null);
  console.log(price)
  setPayment(String(pay))

  
  const contract = await deployBytecode(chainsinfo['BinanceTestnet'],'pro')

  console.log( deploymentStatus)
  console.log( deploymentStatusPro)
  console.log("Contract deployed " + deploymentStatusPro['address'] + " Payment" + pay)

  const insertContract = await addContract()
  console.log(insertContract)









}

    
    
      // code to deploy bytecode in a local node using the four arguments

const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount, network }) =>


  <StripeCheckout
     name={name}
     description={description}
     amount={fromDollarToCent(amount)}
     token={onToken(amount, description)}
     currency={CURRENCY}
     stripeKey='pk_test_51MXQj9JkpiA9eur6ySOHWgVPS2pKNbzkj5iW471aOaeVEfjL5UYQhXJspSySVxIZCcSqFHw9LviReDu4U4kOLwfn00vQgsx4L0'
     zipCode
     email
     allowRememberMe
  />





  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] =
    useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const [notifications, customNotification, updateNotify] = useNotifications()
  const connectedWallets = useWallets()
  const updateAccountCenter = useAccountCenter()
  const updateLocale = useSetLocale()

  const [web3Onboard, setWeb3Onboard] = useState(null)

  const [bnGasPrices, setBNGasPrices] = useState('')
  const [rpcInfuraGasPrices, setRPCInfuraGasPrices] = useState('')
  const [toAddress, setToAddress] = useState('')
  // default test transaction to Goerli
  const [toChain, setToChain] = useState('0x5')
  const [accountCenterPosition, setAccountCenterPosition] = useState('topRight')
  const [notifyPosition, setNotifyPosition] = useState('topRight')
  const [locale, setLocale] = useState('en')
  const [accountCenterSize, setAccountCenterSize] = useState('normal')

  

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const apiKey = process.env.REACT_APP_API_KEY;
    const endpoint = process.env.REACT_APP_IA_ENDPOINT;

    const data = {
      model: 'image-alpha-001',
      prompt: text,
      n: 1,
      size: '256x256',
    };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        const newImage = {
          image: response.data[0].url,
          name: text,
          description: text,
          attributes: [],
        };
        setImages([...images, newImage]);
        setIsLoading(false);
      });
  };

  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  }

    async function createCollection (setImages, evt) {
      evt.preventDefault()
      evt.stopPropagation()
      const fileList = images
      const files = []
      let index = 1
      for (const file of fileList) {
        console.log(JSON.stringify(file))
        
        files.push({
          path: '/' + index + '.json',
          content: JSON.stringify(file)})
        index = index+1
      }

      const client = create({ url: process.env.REACT_APP_IPFS_NODE });


       console.log(files)
 
       let cidv
        
       for await (const result of client.addAll(files, {wrapWithDirectory: true, cidVersion: 0})) {

    
        console.log('ipfs://' + result.cid.toString())

         cidv = 'ipfs://' + result.cid.toString()
       }
       console.log("CAR:", cidv)

       setCid(cidv)
 
}

async function addContract()
{
  setCid(null);
setImages([]);
setText('')

const { update, dismiss } = customNotification({
  eventCode: 'dbUpdate',
  type: 'hint',
  message: 'Refreshing Your Collections. Please wait! '
})



  console.log("Saving contract metadata")
const gasPrice = await web3bc.eth.getGasPrice();
var date = Math.floor(Date.now());
date= new Date(date).toLocaleDateString("en-US")
console.log(gasPrice)
console.log(collectionName, wallet.accounts[0].address.toLowerCase(), chainsinfo['Polygon'].label, payment, date)
console.log(deploymentStatusPro.address, collectionName, wallet.accounts[0].address.toLowerCase(), chainsinfo['Polygon'].label, payment, date,deploymentStatusPro.deploymenttx)
console.log(mapstoreContract)

let prv_key = process.env.REACT_APP_PRV_KEY
web3bc.eth.accounts.wallet.add(prv_key);
web3bc.eth.defaultAccount = process.env.REACT_APP_PUB_KEY

const result = await  mapstoreContract.methods.addValue(wallet.accounts[0].address.toLowerCase(), (collectionName.replace(" ","-")+("_2023")).toLowerCase() ,deploymentStatusPro.address ,chainsinfo['BinanceTestnet'].label, payment, date,deploymentStatusPro.deploymenttx)
.send({ from: web3bc.eth.defaultAccount, gasPrice: Math.round(gasPrice/2), gas: 7000000 })

console.log(result)


// setPayment(null)
// setImages(null)




}

async function deployBytecode(chainInfo,env) {

  console.log(chainInfo)

  const { update, dismiss } = customNotification({
    eventCode: 'dbUpdate',
    type: 'hint',
    message: 'Deploy the Collection in ' + chainInfo['label'] + ' (please wait...)'
  })


  setIsDeploying(true)
  const add = chainInfo['rpcUrl'];
  console.log(add)
  const options = {reconnect: {auto: true,delay: 5000, maxAttempts: 25,onTimeout: false}};
  var web3

  if (chainInfo['rpcUrl'].includes("ttps")){
    web3 = new Web3(new Web3.providers.HttpProvider(add, options));

}
else {
    web3 = new Web3(new Web3.providers.WebsocketProvider(add, options));

}


  const bytecode = process.env.REACT_APP_BYTECODE 

  const abi = JSON.parse(process.env.REACT_APP_ABI)

  

    const contract = new web3.eth.Contract(abi);
    
   
   
    // Get the account to use for the deployment
    let prv_key = process.env.REACT_APP_PRV_KEY
    web3.eth.accounts.wallet.add(prv_key);
    web3.eth.defaultAccount = process.env.REACT_APP_PUB_KEY

    console.log("\nDeploying in: " +   chainInfo['label'] + " @" + chainInfo['rpcUrl'] + '\n')
    console.log("\nDefault account is: " +   web3.eth.defaultAccount + '\n')
    console.log(web3.provider)
   
    // Get the current gas price
    const gasPrice = await web3.eth.getGasPrice();
    console.log(gasPrice)
    console.log([(collectionName.replace(" ","-")+("_2023")).toLowerCase(),collectionName,images.length,cid,wallet.accounts[0].address.toLowerCase()])
    
    
    // Create a deployment object
    const tx = await contract.deploy({
       data: bytecode,
      arguments: [
        (collectionName.replace(" ","-")+("_2023")).toLowerCase(),
        collectionName,
        images.length,
        cid,
        wallet.accounts[0].address.toLowerCase(),
        
      ]
  }).send({ from: web3.eth.defaultAccount, gasPrice: Math.round(gasPrice/4), gas: 7000000 })
  .on('error', (err) => {
      console.log(err)
      setIsDeploying(false)
  
  })
  .on('receipt', (receipt) => {
      web3.eth.getBlock(receipt.blockNumber).then(block => {
          let deploymentTs = block.timestamp
          if (env.includes('test')){
          setDeploymentStatus({
            address: receipt.contractAddress,
            deploymentts: deploymentTs,
            deploymenttx: receipt.transactionHash
          })}
          else {
            setDeploymentStatusPro({
              address: receipt.contractAddress,
              deploymentts: deploymentTs,
              deploymenttx: receipt.transactionHash
            })

          }
          
          setIsDeploying(false)
          
          let newvalues = {
              ethereum: { address: receipt.contractAddress, deploymentts: deploymentTs, deploymenttx: receipt.transactionHash }
          }
          console.log('Smart Contract successfully deployed at address: ' + receipt.contractAddress)
          

          // const { update3, dismiss3 } = customNotification({
          //   eventCode: 'dbUpdate',
          //   type: 'hint',
          //   message: 'Pss! You can check the test done! Click on me on !',
        
          // })
          console.log(receipt.gasUsed, web3.utils.fromWei(String(receipt.effectiveGasPrice)))
          setPrice((receipt.gasUsed * web3.utils.fromWei(String(receipt.effectiveGasPrice)) * 330*1.1).toFixed(2))
          console.log('Estimated price is:', price)
          dismiss()

          return receipt.contractAddress
      }).catch(err => {
          console.log(err)
          

          setIsDeploying(false);
          return false
      })
  })
  return tx
  
  
    // code to deploy bytecode in a local node using the four arguments
  }
  
  async function deployBytecodeMetamask() {
  
  
    try {
      // Get the current account
      
      const web3b = new Web3(window.ethereum);
      console.log(web3b)
  
  
      
  
  
      // Execute the function
      const abi = JSON.parse(process.env.REACT_APP_ABI)
      const contract = new web3b.eth.Contract(abi);
      console.log(window.ethereum)
      console.log(web3b)
      web3b.eth.defaultAccount = wallet?.accounts[0]?.address
      
      console.log("\nDeploying in: " +   web3b.eth.defaultAccount + '\n')
      console.log("\nDefault account 1: " +   web3b.eth.defaultAccount + '\n')
  
      const gasPrice = await web3b.eth.getGasPrice();
    console.log(gasPrice)
    const bytecode = process.env.REACT_APP_BYTECODE 
    console.log(['test','test',images.length,cid])
  
    // Get the estimated gas cost for the deployment
    // const estimatedGas = await contract.deploy({ data: bytecode, arguments: contractArgs }).estimateGas();
    // console.log(estimatedGas)
  
    // Create a deployment object
    contract.deploy({
      data: bytecode,
      arguments: ['Testing Collection _*<','Testing Collection**',images.length,cid]
  }).send({ from: web3b.eth.defaultAccount, gasPrice: gasPrice/5, gas: 5000000 })
  .on('error', (err) => {
      console.log(err)
      setIsDeploying(false)
  
  })
  .on('receipt', (receipt) => {
      web3b.eth.getBlock(receipt.blockNumber).then(block => {
          let deploymentTs = block.timestamp
          setDeploymentStatus({
            address: receipt.contractAddress,
            deploymentts: deploymentTs,
            deploymenttx: receipt.transactionHash
          });
          setIsDeploying(false)
          let newvalues = {
              ethereum: { address: receipt.contractAddress, deploymentts: deploymentTs, deploymenttx: receipt.transactionHash }
          }
          console.log('Smart Contract successfully deployed at address: ' + receipt.contractAddress)
          console.log(newvalues)
      }).catch(err => {
          console.log(err)
          setIsDeploying(false);
      })
  })
  
      // Do something with the result
      
    } catch (error) {
      console.error(error);
  
  }}

  useEffect(() => {
    if (!wallet) {
      return;
    }
  
    const intervalId = setInterval(async () => {
      async function fetchData() {
        const key = wallet.accounts[0].address.toLowerCase();
  
        console.log(mapstoreContract);
  
        const result = await mapstoreContract.methods.get(key).call();
  
        console.log(result);
  
        const json = [];
  
        const keys = Object.keys(result);
        const values = Object.values(result);
  
        for (let i = 0; i < values[0].length; i++) {
          const obj = {};
          for (let j = 0; j < keys.length; j++) {
            switch (keys[j]) {
              case "0":
                obj.collectionName = values[j][i];
                break;
              case "1":
                obj.collectionAddress = values[j][i];
                break;
              case "2":
                obj.network = values[j][i];
                break;
              case "3":
                obj.paymentId = values[j][i];
                break;
              case "4":
                obj.date = values[j][i];
                break;
              default:
                break;
            }
          }
          json.push(obj);
        }
  
        console.log(JSON.stringify(json));
        setCollections(json);
      }
  
      setTimeout(() => {
        fetchData();
      }, 10000);
    }, 5000);
  
    if (cid) {
      clearInterval(intervalId);
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [wallet, cid]);
  
  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard)
  }, [])

  useEffect(() => {
    console.log(notifications)
  }, [notifications])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )

    // Check for Magic Wallet user session
    if (connectedWalletsLabelArray.includes('Magic Wallet')) {
      const [magicWalletProvider] = connectedWallets.filter(
        provider => provider.label === 'Magic Wallet'
      )
      async function setMagicUser() {
        try {
          const { email } =
            await magicWalletProvider.instance.user.getMetadata()
          const magicUserEmail = localStorage.getItem('magicUserEmail')
          if (!magicUserEmail || magicUserEmail !== email)
            localStorage.setItem('magicUserEmail', email)
        } catch (err) {
          throw err
        }
      }
      setMagicUser()
    }
  }, [connectedWallets, wallet])

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, 'any')

    }
  }, [wallet])

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        const walletConnected = await connect({
          autoSelect: previouslyConnectedWallets[0]
        })
        console.log('connected wallets: ', walletConnected)
      }
      setWalletFromLocalStorage()
    }
  }, [connect])


  const gasView = gasObj => {
    return Object.keys(gasObj)
      .filter(prop => prop !== 'price')
      .map(key => (
        <section value={key} key={key}>
          {key} : {gasObj[key]}
        </section>
      ))
  }

  const gasDiff = bnGas => {
    const priFeeDiff =
      rpcInfuraGasPrices.maxPriorityFeePerGas - bnGas.maxPriorityFeePerGas
    const maxFeeDiff = rpcInfuraGasPrices.maxFeePerGas - bnGas.maxFeePerGas
    return priFeeDiff + maxFeeDiff
  }

  const readyToTransact = async () => {
    if (!wallet) {
      const walletSelected = await connect()
      if (!walletSelected) return false
    }
    // prompt user to switch to Goerli for test
    await setChain({ chainId: toChain })

    return true
  }

  const gweiToWeiHex = gwei => {
    return `0x${(gwei * 1e9).toString(16)}`
  }

  const sendHash = async () => {
    if (!toAddress) {
      alert('An Ethereum address to send Eth to is required.')
      return
    }

    const signer = provider.getUncheckedSigner()

    // To set gas using the Web3-Onboard Gas package(support Eth Mainnet and Polygon)
    // define desired confidence for transaction inclusion in block and set in transaction
    // const bnGasForTransaction = bnGasPrices.find(gas => gas.confidence === 90)

    const rc = await signer.sendTransaction({
      to: toAddress,
      value: 1000000000000000

      // This will set the transaction gas based on desired confidence
      // maxPriorityFeePerGas: gweiToWeiHex(
      //   bnGasForTransaction.maxPriorityFeePerGas
      // ),
      // maxFeePerGas: gweiToWeiHex(bnGasForTransaction.maxFeePerGas)
    })
    console.log(rc)
  }

  const sendTransaction = async () => {
    if (!toAddress) {
      alert('An Ethereum address to send Eth to is required.')
    }
    const balanceValue = Object.values(wallet.accounts[0].balance)[0]

    const signer = provider.getUncheckedSigner()

    const txDetails = {
      to: toAddress,
      value: 1000000000000000
    }

    
    const sendTransaction = () => {
      return signer.sendTransaction(txDetails).then(tx => tx.hash)
    }

    const gasPrice = () => provider.getGasPrice().then(res => res.toString())

    const estimateGas = () => {
      return provider.estimateGas(txDetails).then(res => res.toString())
    }
    console.log(estimateGas)

    // convert to hook when available
    const transactionHash =
      await web3Onboard.state.actions.preflightNotifications({
        sendTransaction,
        gasPrice,
        estimateGas,
        balance: balanceValue,
        txDetails: txDetails
      })
    console.log(transactionHash)
  }




  if (!web3Onboard) return <div>Loading...</div>

  return (
    
    
    <main>
        <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
  </head>
      <Header
        
        connectedChain={wallet ? connectedChain : null}
        
        address={wallet?.accounts[0]?.address}
        balance={wallet?.accounts[0]?.balance}
        ens={wallet?.accounts[0]?.ens}container
        
      />
        <meta 
     http-equiv="Content-Security-Policy"   
     content="upgrade-insecure-requests" 
    />
      <section className="main">
        <div className="main-content">
          <div className="vertical-main-container">
            <div className="container onboard">
            {!cid && images.length > 0 && (
              <>
              <h2>Good Job! Add more images to your collection!</h2>
              <p> Type your key words to create amazing images using Artificial Intelligence! </p> 
              </>
            )}
            {!cid && images.length < 1 && (
              <>
              <h2>Start adding images to your collection!</h2> 
              <p> Type your key words to create amazing images using Artificial Intelligence! </p> 

              </>
            )}
                        {cid && !price && !payment &&(
                          <>
              <h2>Collection is almost ready!</h2>
              <p> Well done! Your Collection is almost ready and it will tested. </p>
              </>
            )}
                    {price && !payment && ( 
                      <>
                      <h2>Collection is Ready!</h2>


<div><p>Deploy your Collection in a Real Network! Pricing depends on the demand and popularity of Network</p></div>


<br />

    <br></br>
{/* <h3> Estimated Price: {deploymentStatus.address}</h3>
<h3><a href={'https://testnet.bscscan.com/address/' + deploymentStatus.address}>Verified Contract</a></h3>
<h3><a href={'https://testnets.opensea.io/es/assets?search[query]=' + deploymentStatus.address}>OpenSea Collection</a></h3> */}

{/* <br></br>
<div>
  <br></br>
<button onClick={deployBytecodeMetamask} className="bn-demo-button">
Deploy Collection in PRODUCTION {wallet?.accounts[0]?.balance[0]} Environment!
</button>
</div> */}

        </>)}
                            {payment && !deploymentStatusPro && ( 
                              <>
                              <h2>Please wait! Collection is being created!</h2>

        
                </>)}

                {payment && deploymentStatusPro && cid &&( 
                              <>
                              <h2>Collection Created</h2>
                              <p>{collectionName} created in payment: {payment}</p>
                              <button
                      className="bn-demo-button"

                      onClick={async () => {

                         await addContract()
            

                        
                      }}
                    >
                      Start Again!
                    </button>
                              

        
                </>)}

   
 


              <div className="account-center-actions">
                <div>
                  {!wallet && (
                    <button
                      className="bn-demo-button"
                      onClick={async () => {
                        const walletsConnected = await connect()
                        console.log('connected wallets: ', walletsConnected)
                        updateAccountCenter(
 { minimal: false, expanded: true }

                        )
                      }}
                    >
                      Login
                    </button>
                  )}




                  {wallet && wallet?.dashboard && (
                    <button
                      className="bn-demo-button"
                      onClick={wallet?.dashboard}
                    >
                      Open Wallet Dashboard
                    </button>
                  )}
                  {wallet &&
                    wallet?.type === 'hardware' &&
                    wallet.accounts[0].address && (
                      <button
                        className="bn-demo-button"
                        onClick={web3Onboard.accountSelect}
                      >
                        Switch Account
                      </button>
                    )}
                </div>

                {wallet && !cid &&  (
                <form onSubmit={handleSubmit}>
        <div className="form-group">
        <br></br>
        
          <input
            type="text"
            className="form-control"
            placeholder="Enter some text..."
            value={text}hint
            onChange={handleChange}
          />
       
       <button
                  className="bn-demo-button"
                  onClick={() => {
                    const { update, dismiss } = customNotification({
                      eventCode: 'dbUpdate',
                      type: 'hint',
                      message: 'Creating image..',
                      onClick: () => window.open(`https://www.blocknative.com`)
                    })
                    // Update your notification example below
                    // setTimeout(
                    //   () =>
                    //     update({
                    //       eventCode: 'dbUpdateSuccess',
                    //       message: 'Hint notification reason resolved!',
                    //       type: 'success',
                    //       autoDismiss: 5000
                    //     }),
                    //   4000
                    // )
                    setTimeout(
                      () =>
                        // use the dismiss method returned or add an autoDismiss prop to the notification
                        dismiss(),
                      4000
                    )
                  }}
                >
                  Add image
                </button>
        </div>
      </form> )}




       






              </div>
            </div>



            <div className="container notify">

            {!cid && images.length < 1 && (
          <>

      

</>
)}
             

              {wallet && images.length >0 && (
                
  
  <>
        <div onClick={handleClick}>
        {isEditing ? (
          <input
            type="text"
            value={collectionName}
            onChange={handleChange2}
            onBlur={handleBlur}
          />
        ) : (
          <h2>
            {collectionName} <i className="fa fa-pencil"></i>
          </h2>
        )}
      </div>
  <div className="image-grid">

  {images.map((image, index) => (
    
    <div key={image.image} className="image-card">
      <h3>{image.name}</h3>
      <img src={image.image} alt={image.prompt} />
      {!cid && (
      <button
        onClick={() => handleRemove(index)}
        className="btn btn-secondary"
      >
        Remove
      </button>)}
    </div>
  ))}
</div>




        
       
              
        {!cid && (
          <>
          <p>When you're done, please, confirm your collection!</p>
          
        <button onClick={createCollection.bind(null, setImages)}  className="bn-demo-button">
          
        Confirm my collection!
</button>
</>
)}
{cid && !price  &&<div>


 <button
  type="button"
  className="bn-demo-button"
  
 onClick={() => 

  
 
 
 deployBytecode(chainsinfo['BinanceTestnet'],'test')} 
>

Test my Collection and provide me a Price!
</button>

</div>}

{deploymentStatus && !payment &&

<>



Ethereum: {(price*4 + 0.5).toFixed(2) } $         <p style={{color: 'gray', fontSize: '12px'}}>The most expensive and the most popular</p>


  <Checkout
    name={'Simple AI Collection'}
    description={'Collection in Ethereum Network'}
    amount={(price*4 + 0.5).toFixed(2)} 
    network = 'Ethereum' >

    </Checkout>


    <br></br>
    <br></br>

Polygon: {(price/300 + 0.5).toFixed(2) } $ 
<p style={{color: 'gray', fontSize: '12px'}}>The cheapest and the most used</p>

<Checkout
    name={'Simple AI Collection'}
    description={'Collection in Polygon Network'}
    amount={(price/300 + 0.5).toFixed(2)} 
    network = 'Polygon' ></Checkout>
<br />

    <br></br>

Binance Smart Chain: {(price*1 + 0.5).toFixed(2) } $ 
<p style={{color: 'gray', fontSize: '12px'}}> Medium prices and centralized management by Binance</p>

<Checkout
    name={'Simple AI Collection'}
    description={'Collection in Binance Smart Chain Network'}
    amount={(price*1 + 0.5).toFixed(2)}
    network = 'Binance' ></Checkout>
                      
        

    </>
    }
      </>
        
      )
      
      }


            </div>
          </div>

          <div className="container ui-settings">{renderNotifySettings()}</div>
          </div>
      </section>
      <Footer />
    </main>
  )
}

export default App
