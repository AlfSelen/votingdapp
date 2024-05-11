const {ethers} = window.ethers;
const connectWalletMsg = document.querySelector("#connectWalletMessage");
const connectWalletBtn = document.querySelector("#connectWallet");
const contractID = document.querySelector("#contractID");
const votingStation = document.querySelector("#votingStation");
const timerTime = document.querySelector("#time");
const timerMessage = document.querySelector("#timerMessage");
const mainBoard = document.querySelector("#mainBoard");
const voteForm = document.querySelector("#voteForm");
const vote = document.querySelector("#vote");
const voteBtn = document.querySelector("#sendVote");
const showResultContainer = document.querySelector("#showResultContainer");
const showResult = document.querySelector("#showResult");
const result = document.querySelector("#result");
const admin = document.querySelector("#admin");
const candidates = document.querySelector("#candidates");
const electionDuration = document.querySelector("#electionDuration");
const startAnElection = document.querySelector("#startAnElection");
const candidate = document.querySelector("#candidate");
const addTheCandidate = document.querySelector("#addTheCandidate");
// Configuring Ethers
// const contractAddress = process.env.CONTRACT_ID;
const contractAddress = "0x60425a37227C9371CdD9aE3104B973054F00D4c7"; // This is where you put your contract_ID which you revieve when deploying a contract to a network e.g.: "npx hardhat run scripts/deploy.js --network Sepolia"
const chainID = 11155111; // This is sepolia chain ID -> check for the chain ID for your selected network at https://chainlist.org/

const contractABI = [
  {
    "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberOfVotes",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkElectionPeriod",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionTimer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listOfVoters",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetAllVoterStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieveVotes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "numberOfVotes",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidates",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_votingDuration",
          "type": "uint256"
        }
      ],
      "name": "startElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "voteTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "voterStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

let contract;
let signer;

contractID.innerHTML = '<strong>Contract ID:</strong> ' + contractAddress;


const provider = new ethers.providers.Web3Provider(window.ethereum, chainID);
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  });
});

// Functions
const getAllCandidates = async function() {
    if(document.getElementById("candidateBoard")) {
        document.getElementById("candidateBoard").remove();
    }

    let board = document.createElement("table");
    board.id = "candidateBoard";
    mainBoard.appendChild(board);

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>ID No.</th>
    <th>Candidate</th>`;
    board.appendChild(tableHeader);

    if (contract) {
      let candidates = await contract.retrieveVotes();
      for (let i = 0; i < candidates.length; i++) {
          let candidate = document.createElement("tr");
          candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
          <td>${candidates[i][1]}</td>`;
          board.appendChild(candidate);
      }
    }
}

const getResult = async function() {
    result.style.display = "flex";

    if(document.getElementById('resultBoard')) {
        document.getElementById("resultBoard").remove();
    }

    let resultBoard = document.createElement("table");
    resultBoard.id = "resultBoard";
    result.appendChild(resultBoard);

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>ID No.</th>
                            <th>Candidate</th>
                            <th>Number of Votes</th>`;
    resultBoard.appendChild(tableHeader);

    let candidates = await contract.retrieveVotes();
    for (let i = 0; i < candidates.length; i++) {
        let candidate = document.createElement("tr");
        candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                              <td>${candidates[i][1]}</td>
                              <td>${parseInt(candidates[i][2])}</td>`;
        resultBoard.appendChild(candidate);
    }
}

const refreshPage = function() {
    setInterval(async() => {
        let time = await contract.electionTimer();

        if(time > 0) {
            timerMessage.innerHTML = `<span id="time">${time}</span> second/s left.`;
            voteForm.style.display = 'flex';
            showResultContainer.style.display = "block"; // none TODO
        } else {
            timerMessage.textContent = "Either there's no election yet or the election already ended";
            voteForm.style.display = "none";
            showResultContainer.style.display = "block";
        }
    }, 1000);

    setInterval(async() => {
        getAllCandidates();
    }, 10000);
}

const sendVote = async function() {
    await contract.voteTo(vote.value);
    vote.value = "";
}

const startElection = async function() {
    if (!candidates.value) {
        alert("list of candidates is empty");
    }
    if(!electionDuration.value) {
        alert("please set the election duration");
    }

    const _candidates = candidates.value.split(",");
    const _votingDuration = electionDuration.value;

    await contract.startElection(_candidates,_votingDuration);
    refreshPage();

    candidates.value = "";
    electionDuration.value = "";

    voteForm.style.display = "flex";
    // showResultContainer.style.display = "none";
}

const addCandidate = async function() {
    if (!candidate.value) {
        alert("please provide the candidate name first");
    }

    await contract.addCandidate(candidate.value);
    refreshPage();
    candidate.value = "";
}


const getAccount = async function() {
  console.log("Connecting wallet");
  try {
      // Request account access
      await provider.send("eth_requestAccounts", []);

      // Get the list of accounts
      const accounts = await provider.listAccounts();

      // Get the signer for the first account
      const signer = provider.getSigner(accounts[0]);

      // Create the contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Now, `signer` and `contract` are properly set
      connectWalletBtn.textContent = signer._address.slice(0, 10) + "...";
      connectWalletMsg.textContent = "You are currently connected...";
      connectWalletBtn.disabled = true;

      console.log("awaiting contract owner");
      const owner = await contract.owner();

      console.log("Owner:%s Signer_add:%s", owner, signer._address);
      if (owner === signer._address) {
        console.log("Is admin");
        admin.style.display = "flex";
        console.log("Before ElectoinTimer");

        const time = await contract.electionTimer();
        if (time === 0) {
            await contract.checkElectionPeriod();
        }
      } else {
        console.log("Is user");
      }

      votingStation.style.display = "block";
      refreshPage();
      getAllCandidates();

      console.log("Successfully added wallet")

  } catch (error) {
      // Handle any errors during the process
      console.error("Error connecting to wallet:", error);
  }
}


console.log("Const and function setup complete");

// add event listeners
connectWalletBtn.addEventListener("click", getAccount);
showResult.addEventListener("click", getResult);
voteBtn.addEventListener("click", sendVote);
addTheCandidate.addEventListener("click", addCandidate);
startAnElection.addEventListener("click", startElection);