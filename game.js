// Add click sound to all buttons

const buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        const audio = document.getElementById('click-sound');
        audio.play();
    });
}


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
    playRound();
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
    document.getElementById('round-outcome').textContent = result;

    checkWinner();
}

function checkWinner() {
    if (computerScore == 5) {
        resetTypewriterAnimation("you lose");
    }
    else if (playerScore == 5) {
        resetTypewriterAnimation("you win");
    }
}

// Replay typewriter animation when game ends by replacing title
function resetTypewriterAnimation(gameOutcome) {
    const div = document.getElementById('title');
    const h1 = document.createElement('h1');
    const span = document.createElement('span');
    span.appendChild(document.createTextNode('_'));
    span.classList.add('blink');
    h1.appendChild(document.createTextNode(gameOutcome));
    h1.appendChild(span);

    div.innerHTML = '';
    div.appendChild(h1);
}