const title = document.getElementById('title');
playTypewriterAnimation(title, 'rock paper scissors');

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

let computerSelection;
let playerSelection;

let computerScore = 0;
let playerScore = 0;

const rockSvg = document.getElementById('svg-rock-log').outerHTML;
const paperSvg = document.getElementById('svg-paper-log').outerHTML;
const scissorsSvg = document.getElementById('svg-scissors-log').outerHTML;

const choices = {
    rock: { lose: 'paper', win: 'scissors', icon: rockSvg },
    paper: { lose: 'scissors', win: 'rock', icon: paperSvg },
    scissors: { lose: 'rock', win: 'paper', icon: scissorsSvg }
}

document.getElementById('play-button').addEventListener('click', () => {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';

    const title = document.getElementById('result');
    playTypewriterAnimation(title, 'first to 5 wins');
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
        result = `round 1: ${choices[playerSelection].icon} > ${choices[computerSelection].icon}`
    }
    else if (choices[playerSelection].lose === computerSelection) {
        computerScore++;
        result = `round 1: ${choices[playerSelection].icon} < ${choices[computerSelection].icon}`
    }
    else {
        result = `round 1: ${choices[playerSelection].icon} = ${choices[computerSelection].icon}`
    }
    document.getElementById('computer-score').textContent = computerScore;
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('round-log').innerHTML = result;
    resetAnimation();
    checkWinner();
}

function checkWinner() {
    const result = document.getElementById('result');
    if (computerScore == 5) {
        result.innerHTML = '';
        playTypewriterAnimation(result, 'you lose');
        document.getElementById('play-again-button').style.display = 'flex';
    }
    else if (playerScore == 5) {
        result.innerHTML = '';
        playTypewriterAnimation(result, 'you win');
        document.getElementById('play-again-button').style.display = 'flex';
    }
}

function resetAnimation() {
    var el = document.getElementById('round-log');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}