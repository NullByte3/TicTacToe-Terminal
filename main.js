/* 
Tic-Tac-Toe game using the minimax algorithm with alpha/beta addons to make it impossible,
This uses MIT license like my other projects, so you should be fine copying this code, you can do whatever you want.

I made this in node because it can be copied to other stuff like websites and other programs and it's simple and portable.

As always, bye,
- NullByte3
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = (player) => {
    for (let i = 0; i < winningCombinations.length; i++) {
        let win = true;
        for (let j = 0; j < winningCombinations[i].length; j++) {
            if (board[winningCombinations[i][j]] !== player) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }
    return false;
};

const minimax = (player, depth = 0, alpha = -Infinity, beta = Infinity) => {
    let score = 0;

    // Check if the computer has won
    if (checkWin('O')) {
        return { score: 10 - depth, index: -1 };
    }

    // Check if the player has won
    if (checkWin('X')) {
        return { score: depth - 10, index: -1 };
    }

    // Check for a tie
    if (!board.includes(' ')) {
        return { score: 0, index: -1 };
    }

    // Check for the best move haha (This is impossible to beat because of the alpha/beta)
    let moves = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === ' ') {
            let move = {};
            move.index = i;
            board[i] = player;
            if (player === 'O') {
                move.score = minimax('X', depth + 1, alpha, beta).score;
                alpha = Math.max(alpha, move.score);
            } else {
                move.score = minimax('O', depth + 1, alpha, beta).score;
                beta = Math.min(beta, move.score);
            }
            moves.push(move);
            board[i] = ' ';
            if (alpha >= beta) break;
        }
    }

    // Get the best move
    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    }
    return bestMove;
};


const displayBoard = () => {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === ' ') {
            board[i] = i;
        }
    }
    console.log(` ${board[0]} | ${board[1]} | ${board[2]} `);
    console.log('---|---|---');
    console.log(` ${board[3]} | ${board[4]} | ${board[5]} `);
    console.log('---|---|---');
    console.log(` ${board[6]} | ${board[7]} | ${board[8]} `);
    for (let i = 0; i < board.length; i++) {
        if (board[i] === i) {
            board[i] = ' ';
        }
    }
};

// Get user input using the readline shit
const getUserInput = (callback) => {
    rl.question('Choose a spot (0-8): ', (answer) => {
        if (board[answer] === ' ') {
            board[answer] = 'X';
            callback();
        } else {
            console.log('Spot already taken, choose another spot idiot.');
            getUserInput(callback);
        }
    });
};

// Main game loop
const gameLoop = () => {
    displayBoard();
    if (checkWin('X')) {
        console.log('You won!');
        rl.close();
    } else if (checkWin('O')) {
        console.log('Computer won!');
        rl.close();
    } else if (!board.includes(' ')) {
        console.log('Tie game!');
        rl.close();
    } else {
        getUserInput(() => {
            let computerMove = minimax('O');
            board[computerMove.index] = 'O';
            gameLoop();
        });
    }
};

console.log('Welcome to Tic-Tac-Toe Terminal!');
gameLoop();