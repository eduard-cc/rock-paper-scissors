// Add click sound to all buttons

const buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        const audio = document.getElementById('click-sound');
        audio.play();
    });
}

// Play
let computerSelection;
let playerSelection;

let computerScore = 0;
let playerScore = 0;

const choices = {
    rock: { lose: 'paper', win: 'scissors' },
    paper: { lose: 'scissors', win: 'rock' },
    scissors: { lose: 'rock', win: 'paper' }
}

const playButton = document.getElementById('play-button').addEventListener('click', () => {
    const playContainer = document.getElementById('play-container');
    playContainer.style.display = 'none';
});

// Get player choice
const choiceButtons = document.querySelectorAll('.choice-button');

choiceButtons.forEach(button => button.addEventListener('click', () => {
    playerSelection = button.id;
    getComputerSelection();
    console.log(`Player chose ${playerSelection}`);
    playRound();
}));

// Get computer choice
function getComputerSelection() {
    const keys = Object.keys(choices);
    computerSelection = keys[Math.floor(Math.random() * keys.length)];
    console.log(`Computer chose ${computerSelection}`);
}

function playRound() {
    if (choices[playerSelection].win === computerSelection) {
        console.log('Player won!');
        playerScore++;
        console.log(`Player score: ${playerScore}`);
        console.log(`Computer score: ${computerScore}`);
    }
    else if (choices[playerSelection].lose === computerSelection) {
        console.log('Computer won!');
        computerScore++;
        console.log(`Player score: ${playerScore}`);
        console.log(`Computer score: ${computerScore}`);
    }
    else {
        console.log(`It's a tie!`)
    }
}