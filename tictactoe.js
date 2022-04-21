const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// array of all win condition indexes
const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let count = 0;
let player = 'X';
let ticTacToe = [];
let exampleBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function initializeGame() {
    // set default values
    count = 0;
    ticTacToe = [];
    player = 'X';
    // draw example board
    drawBoard(exampleBoard);
    // display intro
    intro();
    askMove();
}

// prints representation of the game state to the console
function drawBoard(arr) {
    console.log();
    console.log('-------------');
    let line = '| ';
    for (let i = 1; i < 10; i++) {
        line += (arr[i - 1] || ' ') + ' | ';
        if (i % 3 === 0) {
            console.log(line);
            console.log('-------------');
            line = '| ';
        }
    }
}

// prints an intro
function intro() {
    console.log("Let's play tic tac toe!");
    console.log('How to: X goes first.');
    console.log("Enter a number between 1 and 9 to choose where you you'd like to place your move.");
}

function askMove() {
    // check tie
    if (count >= 9) {
        console.log('Its a draw!');
        return askReplay();
    }

    // ask player for input
    readline.question(`Where would you like to place ${player}? `, (slot) => {
        // validate input
        if (slot < 1 || slot > 9) {
            console.log('please enter a number between 1 and 9');
            // reprompt for input
            askMove();
        } else if (slot.length !== 1 || isNaN(parseInt(slot))) {
            console.log("Sorry I didn't get that");
            // reprompt for input
            askMove();
        } else {
            // pass valid input to play()
            play(slot);
        }
    });
}

// prompt for replay
function askReplay() {
    readline.question('Play again? (y/n) ', (answer) => {
        if (answer === 'y') {
            initializeGame();
        } else if (answer === 'n') {
            process.exit(0);
        } else {
            console.log("Sorry I didn't get that.");
            askReplay();
        }
    });
}

function play(slot) {
    // slot is the number picked
    // validate slot is empty
    if (!ticTacToe[slot - 1]) {
        // assign selected slot to player
        ticTacToe[slot - 1] = player;
        // increment move count
        count++;
        // toggle player
        player = player === 'X' ? 'O' : 'X';
    } else {
        console.log('please choose an unused slot');
    }

    drawBoard(ticTacToe);

    // ask for replay if winner
    const winner = calculateWinner();
    if (winner) {
        console.log(`Winner is ${winner}!`);
        return askReplay();
    }
    // prompt user for next move if no winner
    askMove();
}

// checks if any win conditions have been met and returns winning player
function calculateWinner() {
    // loop through all win conditions
    for (let [a, b, c] of winLines) {
        // check if a, b, c are equal and not empty
        if ( ticTacToe[a] && ticTacToe[a] === ticTacToe[b] && ticTacToe[a] === ticTacToe[c] ) {
            // return winner
            return ticTacToe[a];
        }
    }
    // return no winner
    return null;
}

initializeGame();