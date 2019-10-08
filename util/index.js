const EC = require('elliptic').ec;
const cryptoHash = require('./crypto-hash');

const ec = new EC('secp256k1'); // standarts of effecient cryptography 256 koblits(name of mathematitian) 1 is first implementation. this algortithm is used by bitcoin

const verifySignature = ({ publicKey, data, signature }) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');

    return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = { ec, verifySignature, cryptoHash };