import React, { FunctionComponent,useState } from 'react'
import { ethers } from 'ethers'
if (!window.ethereum) { alert('use ethereum browser') }
const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)


export const EthersProvider:FunctionComponent = () => {

  const accounts = provider.send("eth_requestAccounts", [])
  const [userAddress, setUserAddress] = useState<any>()
  const someAccounts = accounts.then((result) => {
    return result
  })
  setUserAddress(someAccounts)
  return userAddress
}

  export default EthersProvider