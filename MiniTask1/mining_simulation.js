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




    mineBlock(difficulty) {
        console.log(`\nMining block ${this.index}... (Looking for ${difficulty} zeros)`);
        
        // to start with zeros
        const target = Array(difficulty + 1).join('0');
        let attempts = 0;
        let startTime = Date.now();

        // trying
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
            attempts++;
            
        
            if (attempts % 10000 === 0) {
                console.log(`Attempt ${attempts}: ${this.hash}`);
            }
        }

     
    }
}


console.log("Testing mining difficulty");

// Easy, 2 zeros
console.log("\nTrying difficulty 2 ");
const easyBlock = new Block(1, "01/01/2023", { amount: 5 });
easyBlock.mineBlock(2);

// Medium, 3 zeros
console.log("\nTrying difficulty 3 ");
const mediumBlock = new Block(2, "02/01/2023", { amount: 10 });
mediumBlock.mineBlock(3);

