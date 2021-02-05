const Blockchain = require('./blockchain.js');

const gitcoin = new Blockchain();

console.log(gitcoin);

// const previousBlockHash = 'PIWY312YROIPUEP89UER';
// const currentBlockData = [
//   {
//     amount: 10,
//     sender: 'PQOWIER9382R3',
//     recipient: 'POI3U2983QORE'
//   },
//   {
//     amount: 30,
//     sender: 'NALCDJSNACKJSA',
//     recipient: 'OPIUPOIWQ'
//   },
//   {
//     amount: 400,
//     sender: 'PQOWIEROQP3498RU3',
//     recipient: '123U9P1U23EWEU'
//   }
// ];
// console.log(gitcoin.hashBlock(previousBlockHash,currentBlockData,269213));
// console.log(gitcoin.proofOfWork(previousBlockHash, currentBlockData));
