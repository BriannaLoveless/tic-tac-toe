const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0;
let player = 'X';
let ticTacToe = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let exampleBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function intro() {
    console.log("Let's play tic tac toe!");
    console.log(
        "How to: X goes first."
    );
    console.log(
        "Enter a number between 1 and 9 to choose where you you'd like to place your move."
    );
}

function counter() {
    count += 1;
}

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

function drawBoard(arr) {
    console.log();
    console.log('-------------');
    let line = '| ';
    for (let i = 1; i < 10; i++) {
        line += arr[i - 1] + ' | ';
        if (i % 3 === 0) {
            console.log(line);
            console.log('-------------');
            line = '| ';
        }
    }
}

function play(slot) {
    // slot is the number picked
    if (ticTacToe[slot - 1] === ' ') {
        ticTacToe[slot - 1] = player;
        if (player === 'X') {
            player = 'O';
        } else if (player === 'O') {
            player = 'X';
        }
    } else {
        console.log('please choose an unused slot')
    }

    drawBoard(ticTacToe);
    const winner = calculateWinner();
    if (winner != ` `) {
        console.log(`Winner is ${winner}!`);
        process.exit(0);
    }
    counter();
    startGame();
}

function startGame() {
 
    if (count < 9) {
        readline.question(
            'Where would you like to place your marker?',
            (slot) => {
                if(slot < 1 || slot > 9){
                    console.log('please enter a number between 1 and 9')
                    startGame()
                } else if (slot.length !== 1 || isNaN(parseInt(slot))) {
                    console.log("I'm sorry, I couldn't understand that")
                    startGame()
                }
                else {
                    play(slot);

                }
            }
        );
    } else {
        console.log('Its a draw!')
        process.exit(0);
    } 
} 

drawBoard(exampleBoard)
intro()
startGame();
