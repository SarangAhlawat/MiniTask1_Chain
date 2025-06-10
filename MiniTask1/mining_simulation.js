// Same crypto module for hashing
const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; // This will help us in mining
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                this.nonce
            )
            .digest('hex');
    }

    // This is where mining happens!
    mineBlock(difficulty) {
        console.log(`\nMining block ${this.index}... (Looking for ${difficulty} zeros)`);
        
        // We want our hash to start with some zeros (like 0000abc123...)
        const target = Array(difficulty + 1).join('0');
        let attempts = 0;
        let startTime = Date.now();

        // Keep trying different nonce values until we get the right hash
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
            attempts++;
            
            // Show progress every 10,000 tries
            if (attempts % 10000 === 0) {
                console.log(`Attempt ${attempts}: ${this.hash}`);
            }
        }

        const timeTaken = (Date.now() - startTime) / 1000;
        console.log(`\nSuccess after ${attempts} attempts in ${timeTaken} seconds!`);
        console.log(`Final hash: ${this.hash}`);
    }
}

// Let's test mining with different difficulties
console.log("Testing mining difficulty...");

// Easy difficulty (2 zeros)
console.log("\nTrying difficulty 2 (should be easy)");
const easyBlock = new Block(1, "01/01/2023", { amount: 5 });
easyBlock.mineBlock(2);

// Medium difficulty (3 zeros)
console.log("\nTrying difficulty 3 (takes longer)");
const mediumBlock = new Block(2, "02/01/2023", { amount: 10 });
mediumBlock.mineBlock(3);

// Hard difficulty (4 zeros - takes much longer!)
console.log("\nTrying difficulty 4 (this will take a while)");
const hardBlock = new Block(3, "03/01/2023", { amount: 15 });
hardBlock.mineBlock(4);