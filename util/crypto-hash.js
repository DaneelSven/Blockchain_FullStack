const crypto = require('crypto');  // module for using cryptography

const cryptoHash = (...inputs) => { // this ...inputs gathers all input into an array so we dont have to define amount of inputs
    const hash = crypto.createHash('sha256');
    
    // here we use stringify cause javascript treats the object in the same way even though its values might change,
    // therefore creating the same hash over and over again even when we change values. To stringify the object, 
    // we create unique hashes for each object. 
    hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' ')); // this takes the input array and sorts in and joins the arguments with an empty space

    return hash.digest('hex'); // digest is a term in cryptography to return the result of the hash. 
};

module.exports = cryptoHash;