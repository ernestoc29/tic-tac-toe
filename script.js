const Gameboard = (() => {
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]

    const getBoard = function () {
        return board;
    };

    const placeMarker = function (index, playerMarker) {
        if (!board[index]) {
            board[index] = playerMarker;
            return true;
        } else {
            return false;
        }
    };

    const reset = function () {
        board = [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
    };

    return { getBoard, placeMarker, reset };
})();

function Player(name, marker) {
    return { name, marker };
}

const Game = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let gameStatus;

    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];



    const startGame = function () {
        player1 = Player("player1", "X");
        player2 = Player("player2", "O");

        currentPlayer = player1;
        gameStatus = "playing";

        Gameboard.reset();
    };

    const move = function (index) {
        if (gameStatus !== "playing") {
            return;
        };

        const playerMove = Gameboard.placeMarker(index, currentPlayer.marker);

        if (!playerMove) {
            return "invalid";
        }

        if (checkWin()) {
            gameStatus = "complete";
            return "win";
        }

        if (checkTie()) {
            gameStatus = "complete";
            return "tie";
        }

        switchPlayers();

        return true;
    };

    const switchPlayers = function () {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    };

    const checkWin = function () {
        const board = Gameboard.getBoard();

        const result = winningPatterns.some(pattern => {
            const values = pattern.map(num => {
                return board[num];
            })

            return values.every(value => value === currentPlayer.marker)
        });

        return result;
    };

    const checkTie = function () {
        return Gameboard.getBoard().every(square => square !== "")
    };

    const getCurrentPlayer = function () {
        return currentPlayer;
    }

    const getGameStatus = function () {
        return gameStatus;
    }

    return { startGame, move, switchPlayers, checkWin, checkTie, getCurrentPlayer, getGameStatus }
})();

const DisplayController = (() => {
    const createBoard = function () {
        const display = document.querySelector(".board");

        for (let i = 0; i < 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.index = i;

            display.appendChild(square);
        }
    };

    const renderBoard = function () {
        const squares = document.querySelectorAll(".square");

        squares.forEach(square => {
            square.textContent = Gameboard.getBoard()[square.dataset.index];
        })
    }

    const addEventListeners = function () {
        const squares = document.querySelectorAll(".square");

        squares.forEach(square => {
            square.addEventListener("click", () => {
                (Game.move(square.dataset.index))
                console.log("rendering board");
                renderBoard();
            })
        })
    }

    return { createBoard, renderBoard, addEventListeners }
})();

DisplayController.createBoard();
Game.startGame();
DisplayController.addEventListeners();