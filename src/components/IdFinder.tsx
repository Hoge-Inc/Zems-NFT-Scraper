import React, { useEffect } from 'react';

type Props = {
    tokenIds: Map<number, []> | undefined,
    setTokenIds: (val: Map<number, []>) => void;
    contractAddress: string;
    userAddress: string;
    loaded: boolean;
    setLoaded: (val: boolean) => void;
}

export const GetNFTs: React.FC<Props> = ({
    tokenIds,
    setTokenIds,
    contractAddress,
    userAddress,
    loaded,
    setLoaded
}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    useEffect(() => {
        if (!isLoading) {

            const API_KEY = process.env.REACT_APP_MORALIS_API_KEY
            if (!API_KEY) { alert('moralis api key not set in env') } else {
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'X-API-Key': API_KEY
                    }
                };
                
                if (!userAddress || !contractAddress || loaded) {} else {
                    setIsLoading(true)
                    setTokenIds(new Map<number, []>())
                    const fetchUrl = 'https://deep-index.moralis.io/api/v2/' + 
                    userAddress + '/nft/' + contractAddress + '?chain=eth&format=decimal'
                    fetch(fetchUrl, options)
                    .then(response => response.json())
                    .then(response => { 
                        var idList: any[] = []
                        let idMap = new Map<number, []>()
                        const r = response.result
                        if (!r || r.length === 0) 
                        { 
                            const notFound = ['none found']
                            idList.push(notFound)
                        } 
                        else 
                        {
                            r.forEach((someValue: any) => {
                                if (someValue.token_id !== undefined){
                                    //console.log(JSON.parse(someValue.metadata).attributes)
                                    idMap.set(someValue.token_id, JSON.parse(someValue.metadata).attributes)
                                    idList.push(someValue.token_id)
                                }
                            })
                        }
                        for(const [key, value] of idMap) {
                            console.log(key, Array.from(value.values()))
                        }
                        //console.log(idList)
                        setTokenIds(idMap)
                        setLoaded(true)
                    })
                    .catch(err => console.error(err))
                    .finally(() => setIsLoading(false) );
                }      
            }
        }
    },[contractAddress, isLoading, loaded, setLoaded, setTokenIds, tokenIds, userAddress])

    if (tokenIds === undefined){return <div></div>}
    const rendered: React.ReactNode[] = [];
    for(let [key] of tokenIds) {
        const component = React.createElement("div", {key: key}, key);
        rendered.push(component);
    }
    //console.log(rendered)
    return <span>{rendered}</span>  
}

export default GetNFTs
