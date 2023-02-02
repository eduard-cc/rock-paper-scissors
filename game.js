// Add click sound to all buttons

const buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        const audio = document.getElementById('click-sound');
        audio.play();
    });
}

function typeWriter(element, text, delay = 50) {
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            element.innerHTML += text[i];
            if (i === text.length - 1) {
                addUnderscore();
            }
        }, delay * i);
    }
}

const title = document.getElementById('title');
typeWriter(title, 'rock paper scissors');    


function addUnderscore() {
    const span = document.createElement('span');
    span.classList.add('blink');
    document.getElementById('title').appendChild(span);
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