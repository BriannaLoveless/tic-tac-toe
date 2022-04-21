# Tic Tac Toe
A Node.js console implementation of Tic Tac Toe

## How to Play
1. Clone this repo
2. `node tictactoe.js`

## Dependencies
- Node.js

## Logic
This is a basic explanation of the program's logic
1. `initializeGame()` sets all default values, draws an example board, displays an intro, and calls `askMove()`
2. `askMove()` asks player for input, performs basic input validation, checks for ties, and passes valid input to `play()`
3. `play()` checks if the requested slot is valid, populates slot, toggles player, draws board, and calls `calculateWinner()` and `askMove()`
4. `calculateWinner()` checks if any win conditions have been met and returns winning player
5. `drawBoard()` prints representation of the game state to the console