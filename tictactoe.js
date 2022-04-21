const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

let player = 'X';
let ticTacToe = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

// function intro() {
//     console.log("Let's play tic tac toe!");
//     console.log(
//         "How to: X goes first. Enter a number between 1 and 9 to choose where you you'd like to place your move. Enter y or n to start playing"
//     );
// }

function calculateWinner() {
    if (ticTacToe[0] == ticTacToe[1] && ticTacToe[0] == ticTacToe[2]) {
        return ticTacToe[0];
    } else if (ticTacToe[3] == ticTacToe[4] && ticTacToe[3] == ticTacToe[5]) {
        return ticTacToe[3];
    } else if (ticTacToe[6] == ticTacToe[7] && ticTacToe[6] == ticTacToe[8]) {
        return ticTacToe[6];
    } else if (ticTacToe[0] == ticTacToe[3] && ticTacToe[0] == ticTacToe[6]) {
        return ticTacToe[0];
    } else if (ticTacToe[1] == ticTacToe[4] && ticTacToe[1] == ticTacToe[7]) {
        return ticTacToe[1];
    } else if (ticTacToe[2] == ticTacToe[5] && ticTacToe[2] == ticTacToe[8]) {
        return (winner = ticTacToe[2]);
    } else if (ticTacToe[0] == ticTacToe[4] && ticTacToe[0] == ticTacToe[8]) {
        return ticTacToe[0];
    } else if (ticTacToe[2] == ticTacToe[4] && ticTacToe[2] == ticTacToe[6]) {
        return ticTacToe[2];
    }
    return ` `;
}

function drawBoard() {
    console.log()
    console.log('-------------');
    let line = '| ';
    for (let i = 1; i < 10; i++) {
        line += ticTacToe[i - 1] + ' | ';
        if (i % 3 === 0) {
            console.log(line);
            console.log('-------------');
            line = '| ';
        }
    }
}

function play(slot) {
    // slot is the number picked
    if (ticTacToe[slot-1] === ' ') {
        ticTacToe[slot-1] = player;
        if (player === 'X') {
            player = 'O';
        } else if (player === 'O') {
            player = 'X';
        }
    }

    drawBoard();
    const winner = calculateWinner();
    if (winner != ` `) {
        console.log(`Winner is ${winner}!`);
        process.exit(0);
    }
    startGame()
}

function startGame() {
    let keepPlaying = false;
    for (let i = 0; i < ticTacToe.length; i++) {
        if (ticTacToe[i] === ' ') {
            keepPlaying = true;
        }
    }
    if (keepPlaying) {
        readline.question('Where would you like to place your marker?', slot => {
            play(slot);
        } )
    }
}

startGame()