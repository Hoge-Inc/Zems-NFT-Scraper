import React, { FunctionComponent,useState } from 'react'
import { ethers } from 'ethers'
if (!window.ethereum) { alert('use ethereum browser') }

export class Login extends React.Component {
  provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
  accounts =  this.provider.send("eth_requestAccounts", []);
  
  handleClick = (_someVar: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.accounts.then((result)=>{
      console.log(result[0])
      console.log('this is:', this, _someVar, e);  
    })
  };
  render(): JSX.Element {
    return (
      <button onClick={(e) => this.handleClick('\n event info', e)}>
        Login
      </button>
    );
  }
}

export default Login
 