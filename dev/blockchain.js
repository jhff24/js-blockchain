//John Henry Fitzgerald
//Date: 2/5/2021
//Building My First Blockchain

const sha256 = require('sha256');

//Blockchain constructor function
function Blockchain(){
  this.chain = [];//all created/mined blocks stored here
  this.pendingTransactions = [];//hold all pending transactions before they are placed into a new block

  //Genesis block. Arbitrary inputs for creating our first block
  this.createNewBlock(100, '0', '0');
};
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
};

//method:getLastBlock returns the last block in the chain
Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
};

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
};

//method: hashBlock SHA256 cryptographic hashing function
//returns seemingly random hash with fixed length
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
  //concat all input data as string
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  //hash input data
  const hash = sha256(dataAsString);

  return hash;
};

/*NOTES ON PROOF OF WORK:
-want to make sure that every block added to chain has the correct data and newTransactions
-we do this by mining it through proof of work
repeatedly run hashBlock method (changing nonce each time) until you get the correct output
**(correct output is a hash that starts with 4 zeroes)**
returns the nonce value that creates the correct hash
KEY: since previousBlockHash is part of the input, one would need to recreate each block successively
in order to "fake" the whole chain
that's an insane amount of computing, aka lots of "work"
*/

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // console.log(hash); //USE FOR TESTING
  }
  return nonce;
};




module.exports = Blockchain; //export Blockchain constructor for testing in test.js
