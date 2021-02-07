//API for Blockchain
//Date:2/7/2021
//John Henry Fitzgerald

const express = require('express');
const app = express();

//endpoint 1
//send back entire blockchain when hit
app.get('/blockchain', function (req, res) {

});

//create new transaction when hit
app.post('/transaction', function(req, res){

});

//create a new block when hit
app.get('/mine', function(req, res){

});

//localhost:3000
app.listen(3000, function() {
  console.log('Listening on port 3000...');
})
