const choices = ["rock", "paper", "scissors"];

let computerSelection;
let playerSelection;

function getComputerSelection()
{
    computerSelection = choices[~~(Math.random() * choices.length)];
    console.log(`Computer chose ${computerSelection}`);
    return playerSelection;
}

function getPlayerSelection()
{
    let input = prompt("Choose: ").toLowerCase();
    if (choices.includes(input))
    {
        playerSelection = input;
        return playerSelection;
    }
    else
    {
        alert("Choose rock, paper or scissors!");
        getPlayerSelection();
    }
}

function playRound(playerSelection, computerSelection)
{
    let result;
    if (playerSelection == "rock")
    {
        switch (computerSelection)
        {
            case "rock":
                result = "It's a tie!";
                break;
            case "paper":
                result = "You lose!";
                break;
            case "scissors":
                result = "You win!";
                break;
        }
        return result;
    }
    else if (playerSelection == "paper")
    {
        switch (computerSelection)
        {
            case "rock":
                result = "You win!";
                break;
            case "paper":
                result = "It's a tie!";
                break;
            case "scissors":
                result = "You lose!";
                break;
        }
        return result;
    }
    else if (playerSelection == "scissors")
    {
        switch (computerSelection)
        {
            case "rock":
                result = "You lose!";
                break;
            case "paper":
                result = "You win!";
                break;
            case "scissors":
                result = "It's a tie!";
                break;
        }
        return result;
    }
}

getPlayerSelection();
getComputerSelection();
console.log(playRound (playerSelection, computerSelection));