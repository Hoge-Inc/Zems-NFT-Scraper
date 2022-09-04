import React, { ChangeEvent, FormEvent } from "react";

import { ethers } from 'ethers'

type SubmitEvent = FormEvent<HTMLFormElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

type Props = {
    setUserAddress: (val: string) => void;
    contractAddress: string;
    setContractAddress: (val: string) => void;
    handleOnSubmit: (e: SubmitEvent) => void;
    placeholder: string;
};

const InputForm: React.FC<Props> = ({
    setUserAddress,
    contractAddress,
    setContractAddress,
    handleOnSubmit,
    placeholder,
}) => {
    const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts =  provider.send("eth_requestAccounts", []);
    



    const handleClick = async (_someVar: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const a = await accounts.then((result)=>{
            console.log(result[0])
            console.log(_someVar, e);
            return result[0]  
        })
        
    
      if (!a) {} else { setUserAddress(a) }
    };

  return (
    <>
        <form onSubmit={handleOnSubmit}>
            
            <input
              type="text"
              value={contractAddress}
              onChange={(e: InputEvent) => setContractAddress(e.target.value)}
              placeholder={placeholder} 
            />
            <button onClick={(e) => handleClick('event info:', e)}>
                Login
            </button>
        </form>
    </>
  );
};

export default InputForm;