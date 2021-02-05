//John Henry Fitzgerald
//Start Date: 2/5/2021
//Building My First Blockchain

const sha256 = require('sha256');

//Blockchain constructor function
function Blockchain(){
  this.chain = [];//all created/mined blocks stored here
  this.pendingTransactions = [];//hold all pending transactions before they are placed into a new block
}
/*Alternative:
class Blockchain {
  constructor() {
    this.chain = [];
    this.newTransactions =[];
  }
  ...methods...
}
*/

//method: createNewBlock creates a new block
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
  //newBlock stores all the data we need for our blockchain
  const newBlock = {
    index: this.chain.length + 1,//unique ID
    timestamp: Date.now(),
    transactions: this.pendingTransactions, //these will be passed into a hashing function
    nonce: nonce,
    hash: hash, //data from our new block
    previousBlockHash: previousBlockHash
  };

  this.pendingTransactions = []; //clear out newTransactions
  this.chain.push(newBlock); //push new block to blockchain

  return newBlock;
}

//method:getLastBlock returns the last block in the chain
Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
}

//method:createNewTransaction creates a new transaction
Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient
  };

  //push newTransaction into newTransactions array (init. in constructor)
  this.pendingTransactions.push(newTransaction);

  return this.getLastBlock()['index'] + 1; //return index of new block (last block in chain)
}

//method: hashBlock SHA256 cryptographic hashing function
//returns seemingly random hash with fixed length
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
  //concat all input data as string
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  //hash input data
  const hash = sha256(dataAsString);

  return hash;
}





module.exports = Blockchain; //export Blockchain constructor for testing in test.js
