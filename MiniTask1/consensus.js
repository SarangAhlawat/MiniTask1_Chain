class Validator {
    constructor(name, power, stake, votes) {
        this.name = name;    
        this.power = power;  
        this.stake = stake;  
        this.votes = votes;  
    }
}

const validators = [
    new Validator("krish", 150, 5000, 45),  
    new Validator("Raj", 200, 3000, 30),    
    new Validator("Mohan", 100, 7000, 25), 
    new Validator("Disha", 180, 4000, 50)   
];

// Showing
console.log("Our validators:");
validators.forEach(v => {
    console.log(`${v.name}: Power=${v.power}, Stake=${v.stake}, Votes=${v.votes}`);
});

// POW
function selectPowValidator(validators) {
    console.log("\nSelecting with Proof-of-Work...");
    console.log("strongest computer wins!");
    
    let winner = validators[0];
    for (let i = 1; i < validators.length; i++) {
        if (validators[i].power > winner.power) {
            winner = validators[i];
        }
    }
    
    console.log(`Winner is ${winner.name} with power ${winner.power}!`);
    return winner;
}

// POS
function selectPosValidator(validators) {
    console.log("\nSelecting with Proof-of-Stake...");
    console.log("most coins staked wins!");
    
    let winner = validators[0];
    for (let i = 1; i < validators.length; i++) {
        if (validators[i].stake > winner.stake) {
            winner = validators[i];
        }
    }
    
    console.log(`Winner is ${winner.name} with stake ${winner.stake}!`);
    return winner;
}

// Delegated 
function selectDposValidator(validators) {
    console.log("\nSelecting with Delegated Proof-of-Stake...");
    console.log("most votes wins!");
    
    let winner = validators[0];
    for (let i = 1; i < validators.length; i++) {
        if (validators[i].votes > winner.votes) {
            winner = validators[i];
        }
    }
    
    console.log(`Winner is ${winner.name} with ${winner.votes} votes!`);
    return winner;
}

// if tie?
function handleTie(validators) {
    console.log("\nWe have a tie in voting!");
    const maxVotes = Math.max(...validators.map(v => v.votes));
    const tied = validators.filter(v => v.votes === maxVotes);
    
    console.log("Tied validators:");
    tied.forEach(v => console.log(v.name));
    
    // Random
    const winner = tied[Math.floor(Math.random() * tied.length)];
    console.log(`Randomly selected ${winner.name} as the winner!`);
    return winner;
}

// Test ing
const powWinner = selectPowValidator(validators);
const posWinner = selectPosValidator(validators);
const dposWinner = selectDposValidator(validators);

console.log("\nFinal Results:");
console.log(`PoW selected ${powWinner.name} (best computer)`);
console.log(`PoS selected ${posWinner.name} (most coins staked)`);
console.log(`DPoS selected ${dposWinner.name} (most votes)`);

// test for tie
console.log("\nTesting tie scenario...");


const tiedValidators = 
[
    new Validator("Mohan", 100, 2000, 30),  new Validator("Ramesh", 120, 2500, 30),
    new Validator("Gurnak", 110, 3000, 25)
];

handleTie(tiedValidators);