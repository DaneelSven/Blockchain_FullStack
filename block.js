 class Block {
  constructor ({timestamp, lastHash, hash, data}) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
 }

module.exports = Block; // node.js syntax for sharing files between each other
