import React, { FunctionComponent,useState } from 'react'


class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter('world')



const Counter:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
    const [clicks, setClicks] = useState(initial);
    return <>
      <p>Clicks: {clicks}</p>
      <button onClick={() => setClicks(clicks+1)}>+</button>
      <button onClick={() => setClicks(clicks-1)}>-</button>
    </>
  
  }
  
  
  interface IProvider {
    connected: boolean;
    type: string;
  }



  const SocialList: React.FC<Props> = (props: Props) => {
    const { websites } = props;
  
    const websiteElements = websites.map((website) => {
      const { name, src, url } = website;
  
      return (
        <a key={name} href={url}>
          <img src={src} />
        </a>
      );
    });
  
    return (
      <React.Fragment>
        { websiteElements }
      </React.Fragment>
    )
  };
 // Note also that you can use the syntax
  <>
    { websiteElements }
  </>



{"dna":"a92188170be0d206981576c51f93b4eb398a6a08750d4c21ca165d1ec3f97a4c","name":"Alpha Citizen #5498","description":"Kryptoria is a VC-backed, immersive map-based block chain game. Set in our Unity-built world, holders will be able to dynamically update all traits on their Alpha Citizen post mint, offering not only individual customisation but ongoing commercial opportunities.\n  \n  \nOwners of Kryptoria’s Alpha Citizens will be entitled to claim one free land NFT and one free weapon NFT per Alpha Citizen they hold, alongside access to our European Web3 venture studio.\n  \n  \nJoin the rebellion!","image":"ipfs://QmaeqkGmmerMxg4RWSi1npVAkQMq1fqYsmwH4ee8EdQZfp/5498.png","imageHash":"1e7121592a1ba4104a918a01026ece9f4e8b8a1182be8ef74b40495b3f67b5a6","edition":5498,"date":1661709606290,"attributes":[{"trait_type":"ARMOUR","value":"None"},{"trait_type":"BACKGROUND","value":"Pink"},{"trait_type":"BASE","value":"Human"},{"trait_type":"CLOTHING","value":"Medusa White"},{"trait_type":"FACE WEAR","value":"Aviators"},{"trait_type":"FACIAL EXPRESSION","value":"Scared Brown"},{"trait_type":"FACIAL HAIR","value":"None"},{"trait_type":"HAIR","value":"Bone Red"},{"trait_type":"HELMET","value":"None"},{"trait_type":"TATTOO","value":"Trident"},{"display_type":"number","trait_type":"Attack - Base","value":25,"max_value":25},{"display_type":"number","trait_type":"Defence - Base","value":25,"max_value":25},{"display_type":"number","trait_type":"Defence - Armour","value":0,"max_value":75},{"display_type":"number","trait_type":"Defence - Helmet","value":0,"max_value":25}]}
