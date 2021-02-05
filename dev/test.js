const Blockchain = require('./blockchain.js');

const gitcoin = new Blockchain();

gitcoin.createNewBlock(1234, 'ALKJSDF2384', 'AHASFDHGASDFHG87');
gitcoin.createNewBlock(9000, 'HHJSFJGHDBJH', 'ASDFGERGFG');
gitcoin.createNewBlock(50247, 'CASDCSDCASDC', 'KLHERWLKJVNLDKJF89');

console.log(gitcoin);
