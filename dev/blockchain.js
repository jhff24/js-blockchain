//John Henry Fitzgerald
//Start Date: 2/5/2021
//Building My First Blockchain


//The guy who made the tutorial I'm following does not like JS classes
//I am inclined to agree; constructors usually do the trick
//Blockchain constructor function
function Blockchain(){
  this.chain = [];//all created/mined blocks stored here
  this.newTransactions = [];//hold all new transactions before they are placed into a block and mined
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

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
  //newBlock stores all the data we need for our blockchain
  const newBlock = {
    index: this.chain.length + 1,//unique ID
    timestamp: Date.now(),
    transactions: this.newTransactions, //these will be passed into a hashing function
    nonce: nonce,
    hash: hash, //data from our new block
    previousBlockHash: previousBlockHash
  };

  this.newTransactions = []; //clear out newTransactions
  this.chain.push(newBlock); //push new block to blockchain

  return newBlock;
}
