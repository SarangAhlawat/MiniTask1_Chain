const crypto = require('crypto'); // node crypto module for hashing



// Block class with all the things
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;               
        this.timestamp = timestamp;       
        this.data = data;                 
        this.previousHash = previousHash; 
        this.hash = this.calculateHash(); 
        this.nonce = 0;                   
    }

    // function for unique hash
    calculateHash() {
        return crypto
            .createHash('sha256')// hash generator using SHA-256
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                this.nonce
            )
            .digest('hex');// hexadecimal string
    }
}






// class to hold our blocks
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // first block
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2023', 'First Block', '0');
    }



    // last block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Adds new block
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // previous
        newBlock.hash = newBlock.calculateHash();           // new
        this.chain.push(newBlock);                         // Adding
    }




    // checks for tampered blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) { // check current block hash correctness
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) { // check for previous block pointing
                return false;
            }
        }
        return true;
    }
}






// testing
let simpleChain = new Blockchain();

console.log("block 1 adding");
simpleChain.addBlock(new Block(1, "02/01/2023", { amount: 10 }));


console.log("block 2 adding");
simpleChain.addBlock(new Block(2, "03/01/2023", { amount: 20 }));

console.log("\nOur blockchain is:");
console.log(JSON.stringify(simpleChain.chain, null, 2));



console.log("\nblockchain valid?", simpleChain.isChainValid()); //is valid?






// below is the challenge for tempering data...


// changing data in block 1
console.log("\nChanging data in block 1...");
simpleChain.chain[1].data = { amount: 1002 }; 

// is valid?
console.log("Is blockchain still valid?", simpleChain.isChainValid());

// how recomputed
console.log("\nBlock 1 hash:", simpleChain.chain[1].hash);
console.log("Block 2 previous:", simpleChain.chain[2].previousHash);
console.log("not matching now...");