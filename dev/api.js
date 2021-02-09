//API for Blockchain
//Date:2/7/2021
//John Henry Fitzgerald


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const gitcoin = new Blockchain();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//endpoint 1
//send back entire blockchain when hit
app.get('/blockchain', function (req, res) {
  res.send(gitcoin);
});

//create new transaction when hit
app.post('/transaction', function(req, res){
  const blockIndex = gitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}`});
});

//create a new block when hit
app.get('/mine', function(req, res){
  const lastBlock = gitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: gitcoin.pendingTransactions;
    index: lastBlock['index'] + 1;
  };

  const nonce = gitcoin.proofOfWork(previousBlockHash, currentBlockData);

  const blockHash = gitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  const newBlock = gitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
});

//localhost:3000
app.listen(3000, function() {
  console.log('Listening on port 3000...');
})
