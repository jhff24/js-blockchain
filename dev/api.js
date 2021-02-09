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
  console.log(req.body);
  res.send(`The amount  of the transaction is ${req.body.amount} gitcoin.`);
});

//create a new block when hit
app.get('/mine', function(req, res){

});

//localhost:3000
app.listen(3000, function() {
  console.log('Listening on port 3000...');
})
