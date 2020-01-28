/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- Moreover, if a player rolls a 6 twice in a row, his entire score gets lost
   which means his temporary score as well as his permanent score is lost.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach specified winning points on GLOBAL score wins the game
- Before starting the game, a winning point must have to be chosen so that
  the player who gains the winning point first, wins the game
*/

let finalScore, scores, roundScore, activePlayer, gamePlaying, previousDice;

function init() {
    finalScore = prompt("Enter the final score required to win the game");
    // finalScore = 50;
    finalScore = parseInt(finalScore);

    finalScore = (finalScore === NaN ? 100 : finalScore);

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDice = 1;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    
    document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying) {
        // Generate Random number
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result in the UI
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        // 3. Update the round score if the rolled number is not a 1
        if(dice == 6 && previousDice == 6) {
            previousDice = 1;
            scores[activePlayer] = 0;
            roundScore = 0;
            document.getElementById("score-" + activePlayer).textContent = 0;
            document.getElementById("current-" + activePlayer).textContent = 0;
            nextPlayer();
        } else if(dice !== 1) {
            roundScore += dice;
            previousDice = dice;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
    }

});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if(gamePlaying) {
        // Add the CURRENT score to the global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // check if the current player won the game
        if(scores[activePlayer] >= finalScore) {
            document.getElementById("name-" + activePlayer).textContent = "WINNER!";
            document.querySelector(".dice").style.display = "none";

            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }

}); 

document.querySelector(".btn-new").addEventListener("click", init);

























