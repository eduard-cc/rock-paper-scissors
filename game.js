const title = document.getElementById('title');
playTypewriterAnimation(title, 'rock paper scissors');

const result = document.getElementById('result');
// Add click sound to all buttons

const buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        const audio = document.getElementById('click-sound');
        audio.play();
    });
}


function playTypewriterAnimation(element, text, delay = 50) {
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            element.innerHTML += text[i];
            // Add blinking underscore when animation finished
            if (i === text.length - 1) {
                appendUnderscore(element);
            }
        }, delay * i);
    }
}

// Create span element and append it to text

function appendUnderscore(underscoreElement) {
    const span = document.createElement('span');
    span.appendChild(document.createTextNode('_'));
    span.classList.add('blink');
    underscoreElement.appendChild(span);
}

// Reset css animation using reflow

function resetAnimation() {
    const roundLog = document.getElementById('round-log');
    roundLog.style.animation = 'none';
    roundLog.offsetHeight;
    roundLog.style.animation = null;
}

let computerSelection;
let playerSelection;

let computerScore = 0;
let playerScore = 0;
let roundNumber = 0;

const rockSvg = document.getElementById('svg-rock-log').outerHTML;
const paperSvg = document.getElementById('svg-paper-log').outerHTML;
const scissorsSvg = document.getElementById('svg-scissors-log').outerHTML;

const choices = {
    rock: { lose: 'paper', win: 'scissors', icon: rockSvg },
    paper: { lose: 'scissors', win: 'rock', icon: paperSvg },
    scissors: { lose: 'rock', win: 'paper', icon: scissorsSvg }
}

// Start game

document.getElementById('play-button').addEventListener('click', () => {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';

    playTypewriterAnimation(result, 'first to 5 wins');
});

// Get player choice

const choiceButtons = document.querySelectorAll('.choice-button');

choiceButtons.forEach(button => button.addEventListener('click', () => {
    playerSelection = button.id;
    getComputerSelection();
    playRound();
}));

function getComputerSelection() {
    const keys = Object.keys(choices);
    computerSelection = keys[Math.floor(Math.random() * keys.length)];
}

function playRound() {
    let roundLog;
    roundNumber++;
    if (choices[playerSelection].win === computerSelection) {
        playerScore++;
        roundLog = `round ${roundNumber}: ${choices[playerSelection].icon} > ${choices[computerSelection].icon}`;
    }
    else if (choices[playerSelection].lose === computerSelection) {
        computerScore++;
        roundLog = `round ${roundNumber}: ${choices[playerSelection].icon} < ${choices[computerSelection].icon}`;
    }
    else {
        roundLog = `round ${roundNumber}: ${choices[playerSelection].icon} = ${choices[computerSelection].icon}`;
    }
    document.getElementById('computer-score').textContent = computerScore;
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('round-log').innerHTML = roundLog;
    
    resetAnimation();
    checkWinner();
}

function checkWinner() {
    if (computerScore == 5) {
        document.getElementById('lose-sound').play();
        document.body.setAttribute('id','fade-lose');
        endGame('you lose');
    }
    else if (playerScore == 5) {
        endGame('you win!');
        document.getElementById('win-sound').play();
        document.body.setAttribute('id','fade-win');
    }
}

// End game

function endGame(outcome) {
    result.innerHTML = '';
    playTypewriterAnimation(result, outcome);
    document.getElementsByClassName('choice-container')[0].style.display = 'none';
    document.getElementById('play-again-button').style.display = 'flex';
}

// Restart game

document.getElementById('play-again-button').addEventListener('click', () => {
    while (document.body.attributes.length > 0) {
        document.body.removeAttribute(document.body.attributes[0].name);
    }
    document.getElementById('play-again-button').style.display = 'none';
    computerScore = 0;
    playerScore = 0;
    roundNumber = 0;
    result.innerHTML = '';
    playTypewriterAnimation(result, 'first to 5 wins');
    document.getElementsByClassName('choice-container')[0].style.display = 'block';
    document.getElementById('computer-score').textContent = 0;
    document.getElementById('player-score').textContent = 0;
    document.getElementById('round-log').innerHTML = '';
});