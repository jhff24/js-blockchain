const Blockchain = require('./blockchain.js');

const gitcoin = new Blockchain();

gitcoin.createNewBlock(1234, 'ALKJSDF2384', 'AHASFDHGASDFHG87');

gitcoin.createNewTransaction(100, 'ALEXFAJHSDFL', 'JENNTYVJRKJHB');

gitcoin.createNewBlock(12367, 'QPWIEYROQIW', 'F9823098JR4F');

console.log(gitcoin.chain[1]);
