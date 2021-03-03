//API for Blockchain
//Date:2/7/2021
//John Henry Fitzgerald


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const {v1: uuid} = require('uuid'); //updated format differs from tut.
const port = process.argv[2];//pulls 3rd "element" from "array" 'scripts.start' in package.json (port)
const rp = require('request-promise');

const nodeAddress = uuid().split('-').join('');//remove hyphens from address

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
    transactions: gitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  };

  const nonce = gitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = gitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  gitcoin.createNewTransaction(12.5, "00", nodeAddress);

  const newBlock = gitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
  res.json({
    note: "New block mined successfully",
    block: newBlock
  });
});

//register node and broadcast it to the whole network
app.post('/register-and-broadcast-node', function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (gitcoin.networkNodes.indexOf(newNodeUrl) == -1) gitcoin.networkNodes.push(newNodeUrl);

  const regNodesPromises = [];
  gitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true
    };

    regNodesPromises.push(rp(requestOptions));//push each node to the regNodePromises array
  });

  Promise.all(regNodePromises).then(data => {
    const bulkRegisterOptions = {
      uri: newNodeUrl + '/register-nodes-bulk',
      method: 'POST',
      body: { allNetworkNodes: [ ...gitcoin.networkNodes, gitcoin.currentNodeUrl] },
      json: true
    };

    return rp(bulkRegisterOptions);
  })
  .then(data => {
    res.json({ note: 'New node registered with network successfully.'})
  })
});

//register a node with the network
//a.k.a. existing node uses this to accept a newly broadcasted node
app.post('/register-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = gitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = gitcoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) gitcoin.networkNodes.push(newNodeUrl);//register new node with node we are currently on by adding to its networkNodes array
    res.json({ note: 'New node registered successfully with node.' });
});

//register multiple nodes at once
//new nodes use this to register all pre-existing nodes
app.post('register-nodes-bulk', function(req, res) {

});




//localhost:3000
app.listen(port, function() {
  console.log(`Listening on port ${port}...`);
})
