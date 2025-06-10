// Let's make some validators (people who can add blocks)
class Validator {
    constructor(name, power, stake, votes) {
        this.name = name;    // Their name
        this.power = power;  // For Proof-of-Work (how strong their computer is)
        this.stake = stake;  // For Proof-of-Stake (how many coins they have)
        this.votes = votes;  // For Delegated Proof-of-Stake (how many votes they got)
    }
}

// Make some pretend validators
const validators = [
    new Validator("Alice", 150, 5000, 45),  // Strong computer, lots of coins, many votes
    new Validator("Bob", 200, 3000, 30),    // Very strong computer, some coins, some votes
    new Validator("Charlie", 100, 7000, 25), // Weak computer, most coins, few votes
    new Validator("Diana", 180, 4000, 50)   // Strong computer, many coins, most votes
];

// Show our validators
console.log("Our validators:");
validators.forEach(v => {
    console.log(`${v.name}: Power=${v.power}, Stake=${v.stake}, Votes=${v.votes}`);
});

// Proof-of-Work selection (like Bitcoin)
function selectPowValidator(validators) {
    console.log("\nSelecting with Proof-of-Work...");
    console.log("Whoever has the strongest computer wins!");
    
    let winner = validators[0];
    for (let i = 1; i < validators.length; i++) {
        if (validators[i].power > winner.power) {
            winner = validators[i];
        }
    }
    
    console.log(`Winner is ${winner.name} with power ${winner.power}!`);
    return winner;
}

// Proof-of-Stake selection (like Ethereum after merge)
function selectPosValidator(validators) {
    console.log("\nSelecting with Proof-of-Stake...");
    console.log("Whoever has the most coins staked wins!");
    
    let winner = validators[0];
    for (let i = 1; i < validators.length; i++) {
        if (validators[i].stake > winner.stake) {
            winner = validators[i];
        }
    }
    
    console.log(`Winner is ${winner.name} with stake ${winner.stake}!`);
    return winner;
}

// Delegated Proof-of-Stake selection (like EOS)
function selectDposValidator(validators) {
    console.log("\nSelecting with Delegated Proof-of-Stake...");
    console.log("Whoever got the most votes wins!");
    
    let winner = validators[0];
    for (let i = 1; i < validators.length; i++) {
        if (validators[i].votes > winner.votes) {
            winner = validators[i];
        }
    }
    
    console.log(`Winner is ${winner.name} with ${winner.votes} votes!`);
    return winner;
}

// What if there's a tie in DPoS?
function handleTie(validators) {
    console.log("\nOh no! We have a tie in voting!");
    const maxVotes = Math.max(...validators.map(v => v.votes));
    const tied = validators.filter(v => v.votes === maxVotes);
    
    console.log("Tied validators:");
    tied.forEach(v => console.log(v.name));
    
    // Randomly pick one
    const winner = tied[Math.floor(Math.random() * tied.length)];
    console.log(`Randomly selected ${winner.name} as the winner!`);
    return winner;
}

// Test our selection methods
const powWinner = selectPowValidator(validators);
const posWinner = selectPosValidator(validators);
const dposWinner = selectDposValidator(validators);

console.log("\nFinal Results:");
console.log(`PoW selected ${powWinner.name} (best computer)`);
console.log(`PoS selected ${posWinner.name} (most coins staked)`);
console.log(`DPoS selected ${dposWinner.name} (most votes)`);

// Test tie scenario
console.log("\nTesting tie scenario...");
const tiedValidators = [
    new Validator("Eve", 100, 2000, 30),
    new Validator("Frank", 120, 2500, 30),
    new Validator("Grace", 110, 3000, 25)
];

handleTie(tiedValidators);