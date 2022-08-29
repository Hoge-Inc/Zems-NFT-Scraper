import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";

function App() {
  const inputText = '0x...<SomeNftAddress>'
  const btnMsg = 'connect ethers'
  const listMsg = 'get list'
  const deadAddress = '0x000000000000000000000000000000000000dEaD'
  
  const [userAddress, setUserAddress] = useState<ethers.BigNumber[]>()
  const [web3Prov, setWeb3Prov] = useState<ethers.providers.Web3Provider>()
  const [btnText, setBtnText] = useState<string>(btnMsg)
  const [tokenIds, setTokenIds] = useState<string[]>()
  const [contractAddress, setContractAddress] = useState<string>('') //0x33D3a5c1E523B0AEE0B6d9Ec22f520F9f99a1738
  const [burnId, setBurnId] = useState<string>('')
  const [someMsg, setSomeMsg] = useState<string>('')

  const handleContractChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setContractAddress(event.target.value)
    clearStored()
  }
  
  const handleInputIdChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setBurnId(event.target.value)
  }

  useEffect(() => {
    try{ window.ethereum.on('accountsChanged', function () {
      clearStored()
      setAddr()

    })} catch (e) {return}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const web3 = () => {
    if (!window.ethereum) { setSomeMsg('use ethereum browser'); return }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setWeb3Prov(provider)
    console.log(provider)
    setBtnText('user address')
  }

  const setAddr = async () => {
    if (!ethers.utils.isAddress(contractAddress)) { setSomeMsg('need valid address'); return }
    if (!web3Prov) { web3(); return }
    const accounts = await web3Prov.send("eth_requestAccounts", []);
    setUserAddress(accounts)
    console.log(accounts)
    setBtnText(listMsg)
  }

  const clearStored = () => {
    setBtnText(btnMsg)
    setTokenIds(undefined)
    setWeb3Prov(undefined)
    setUserAddress(undefined)
    setSomeMsg('')
  }

  const getNFTs = async () => {
    if (!userAddress) { setAddr(); return }
    if (btnText === 'reset') { clearStored(); return }
    const API_KEY = process.env.REACT_APP_MORALIS_API_KEY
    const NFT_CONTRACT = contractAddress
    if (!API_KEY) { alert('moralis api key not set in env'); return }
    if (!userAddress) { setAddr(); return }
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': API_KEY
      }
    };
    const fetchUrl = 'https://deep-index.moralis.io/api/v2/' + 
      userAddress + '/nft/' + NFT_CONTRACT + '?chain=eth&format=decimal'
    const result = await fetch(fetchUrl, options)
      .then(response => response.json())
      .then(response => { 
        const r = response.result
        if (!r || r.length === 0) 
        { 
          const noneJson = JSON.parse(JSON.stringify(['none found']))
          setTokenIds(noneJson)
          return
        } 
        else 
        {
          console.log(r)
          getTokenIds(r)
        }
      })
      .catch(err => console.error(err));
    setBtnText('reset')
    return result
  }

  const getTokenIds = (result: any[]) => {
    if (!result || result.length === 0){return}
    var idList: any[] = []
    result.forEach((someValue: any) => {
      if (someValue.token_id !== undefined){
        idList.push(someValue.token_id, '\n')
      }
    })
    if(idList.length === 0){}
    setTokenIds(idList)
  }

  const txDead = async () => {
    if (!web3Prov || !userAddress || burnId === ''){return}
    const signer = web3Prov.getSigner();
    const burnIdHex = '0x' + parseInt(burnId).toString(16)
    console.log('try 721')
    try{
      const erc721Abi = [
        "function transferFrom(address from, address to, uint256 tokenId)",
        "function approve(address to, uint256 tokenId)",
        "function getApproved(uint256 tokenId) view returns (address)",
      ]
      const contract = new ethers.Contract(contractAddress, erc721Abi, signer)
      const tx = await contract.transferFrom(
        userAddress[0], 
        deadAddress, 
        burnIdHex
      )
      console.log(tx)
    }
    catch {
      console.log('try 1155')
      try{
        const erc1155Abi = [
          "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)",
          "function isApprovedForAll(address account, address operator) view returns (bool)",
          "function setApprovalForAll(address operator, bool approved)"
        ]
        const contract = new ethers.Contract(contractAddress, erc1155Abi, signer)
        const tx = await contract.safeTransferFrom(
          userAddress[0], 
          deadAddress, 
          burnIdHex,
          0x1, 
          0x0
        )
        console.log(tx)
      }
      catch (e) {
        console.error(e)
        setSomeMsg('NFT Type not found')
      }
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <>
        <h4>contract to look at:</h4>
        <input onChange={handleContractChange} placeholder={inputText}/>
        <br></br>
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        <h5>{someMsg}</h5>
        <button onClick={getNFTs}>{btnText}</button>
        <br></br>
        <h5>
          <label hidden={!tokenIds}>Found Token IDs:</label>
          <br></br>
          {tokenIds}
        </h5>
        <br></br>
        <div hidden={!tokenIds || tokenIds[0] === "none found"}>
          <input onChange={handleInputIdChange} placeholder={'token id input'} />
          <br></br>
          <button onClick={txDead}>make dead</button>
          <h6>
            this calls erc721 or erc1155 functions to send to the 0x0..dead wallet
            <p></p>
            ***watch out for malicious overide of functions from unverified contracts***
          </h6>
        </div>
        </>
      </header>

    </div>
  );
}



export default App;
