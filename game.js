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

document.getElementById('play-button').addEventListener('click', () => {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
});

// Get player choice
const choiceButtons = document.querySelectorAll('.choice-button');

choiceButtons.forEach(button => button.addEventListener('click', () => {
    playerSelection = button.id;
    getComputerSelection();
    roundLog(playRound());
}));

// Get computer choice
function getComputerSelection() {
    const keys = Object.keys(choices);
    computerSelection = keys[Math.floor(Math.random() * keys.length)];
}


function playRound() {
    let result;
    if (choices[playerSelection].win === computerSelection) {
        playerScore++;
        result = `${playerSelection} WIN ${computerSelection}`
    }
    else if (choices[playerSelection].lose === computerSelection) {
        computerScore++;
        result = `${playerSelection} LOSE ${computerSelection}`
    }
    else {
        result = `${playerSelection} TIE ${computerSelection}`
    }
    document.getElementById('computer-score').textContent = computerScore;
    document.getElementById('player-score').textContent = playerScore;
    return result;
}

function game() {
    if (computerScore == 5) {
        console.log(`COMPUTER 5`);
    }
    else if (playerScore == 5) {
        console.log(`PLAYER 5`)
    }
}

function roundLog(result) {
    const li = document.createElement('li');
    li.textContent = result;
    const ul = document.getElementById('results-container');
    ul.insertAdjacentElement('afterbegin', li);
}