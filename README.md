# About
This project is from OneCodeCamp's (```youtube.com/@onecodecamp```) tutorial  ```Create a simple Voting DApp with Solidity```
Myself and several in the comments requested the code, but got no answer from the creator, so I wanted to share the code. All code is manually typed from the tutorial video, just some minor quality of life improvements and error handling.\
*Feel free to give feedback and give a star if this helped you.*

# Setup
The examples for setting up the project are for the Sepolia network.

## Prerequisites
**1.1.** ```git clone https://github.com/AlfSelen/votingdapp.git```\
**1.2.** Get an API key for scanning blockchain, e.g. by creating an account at ```https://etherscan.io```\
**1.3.** Create a wallet and add plugin to browser  e.g. ```https://metamask.io/download/```\
**1.4.** Find a RPC url for your selected network at ```https://chainlist.org``` or ```https://chainlist.org/chain/11155111``` for Sepolia network\
**1.5.** Within the hardhat directory rename ```RENAME.env``` to ```.env``` and insert your API key, wallet private address and RPC url\
**1.6.** Get testnet Ether (ETH) on wallet address, ```https://www.alchemy.com/faucets/ethereum-sepolia``` NOTE: This requires having 0.001 ETH on your wallet address on mainnet aprox 3$ worth, can be bought at e.g. ```https://www.binance.com/en/how-to-buy/ethereum```\
**1.7.** Install nodejs ```https://nodejs.org/en/download/current``` NOTE: Install the LTS (Long time support) version, hardhat might not support the others

## Deploy steps hardhat:
**2.1.** ```cd hardhat```\
**2.2.** ```npm init -y```\
**2.3.** ```npm install hardhat```\
**2.4.** ```npm install --save-dev @nomicfoundation/hardhat-toolbox```\
**2.5.** ```npx hardhat init```\
**2.6.** Edit ```hardhat.config.js``` to ```DEMOhardhat.config.js```\
**2.7.** ```npx hardhat run scripts/deploy.js --network Sepolia```\
**2.8.** ```npx hardhat verify --network Sepolia "Id of contract given from the previous command"```v

## Deploy steps frontend:
**3.1.** In ```frontend/script.js``` edit ```const contractAddress``` to the ID from step **2.7**\
**3.2.** In ```frontend/script.js``` edit ```const chainID``` to the chainID from step **1.3** (e.g. sepolia is 11155111)\
**3.3.** Open ```frontend/index.html``` right click within the editor and press ```open live server``` NOTE: This exposes your while Votingdapp directory to your local network, including the .env file with the private key. Only use on a trusted network or preferably continue with the next step\
**3.3.1** (Optional Security) Open extensions (```Ctrl+Shift+X```) and right click ```Live Server``` select ```Extension Settings``` -> scroll down to ```Live Server > Settings: Root``` and select ```Edit in settings.json``` and change ```"liveServer.settings.root": ""``` to ```"liveServer.settings.root": "/frontend"``` - This make sure that only the frontent directory is available to the webserver\
**3.4.** Connect with MetaMask (remember to log in and to specify your selected network)

## Troubleshooting
Right click in browser and inspect element to check the browser console for any errors.\
Temporarly rename the style.css, to check that the html displays as intended.
