const crypto = require('crypto');

const cryptoHash = (...inputss) => { // this ...inputs gathers all input into an array so we dont have to define amount of inputs
    const hash = crypto.createHash('sha256');
    
    hash.update(inputss.sort().join(' '));

    return hash.digest('hex'); // digest is a term in cryptography to return the result of the hash. 
};

module.exports = cryptoHash;