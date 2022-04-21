const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0;
let player = 'X';
let ticTacToe = [];
let exampleBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
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

function intro() {
    console.log("Let's play tic tac toe!");
    console.log('How to: X goes first.');
    console.log(
        "Enter a number between 1 and 9 to choose where you you'd like to place your move."
    );
}

function askReplay() {
    readline.question(
        'Play again? (y/n) ',
        (answer) => {
            if (answer === 'y'){
                initializeGame()
            } else if (answer === 'n') {
                process.exit(0)
            } else {
                console.log("Sorry I didn't get that.")
                askReplay()
            }
        })
}

function initializeGame() {
    count = 0
    ticTacToe = []
    player= 'X'
    drawBoard(exampleBoard);
    intro();
    askMove()
}

function counter() {
    count += 1;
}

function calculateWinner() {
    for (let [a, b, c] of winLines) {
        if (
            ticTacToe[a] &&
            ticTacToe[a] === ticTacToe[b] &&
            ticTacToe[a] === ticTacToe[c]
        ) {
            return ticTacToe[a]
        }
    }
    return ' '
}

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

function play(slot) {
    // slot is the number picked
    if (!ticTacToe[slot - 1]) {
        ticTacToe[slot - 1] = player;
        counter();
        if (player === 'X') {
            player = 'O';
        } else if (player === 'O') {
            player = 'X';
        }
    } else {
        console.log('please choose an unused slot');
    }

    drawBoard(ticTacToe);
    const winner = calculateWinner();
    if (winner != ' ') {
        console.log(`Winner is ${winner}!`);
        askReplay();
    }
    
    askMove();
}

function askMove() {
    if (count < 9) {
        readline.question(
            `Where would you like to place ${player}? `,
            (slot) => {
                if (slot < 1 || slot > 9) {
                    console.log('please enter a number between 1 and 9');
                    askMove();
                } else if (slot.length !== 1 || isNaN(parseInt(slot))) {
                    console.log("I'm sorry, I couldn't understand that");
                    askMove();
                } else {
                    play(slot);
                }
            }
        );
    } else {
        console.log('Its a draw!');
        askReplay();
    }
}

initializeGame()
