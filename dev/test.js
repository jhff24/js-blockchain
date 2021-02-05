const Blockchain = require('./blockchain.js');

const gitcoin = new Blockchain();

const previousBlockHash = 'PIWY312YROIPUEP89UER';
const currentBlockData = [
  {
    amount: 10,
    sender: 'PQOWIER9382R3',
    recipient: 'POI3U2983QORE'
  },
  {
    amount: 30,
    sender: 'NALCDJSNACKJSA',
    recipient: 'OPIUPOIWQ'
  }
];
const nonce = 100;

console.log(gitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));
