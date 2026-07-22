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



    const startGame = function (player1Name, player2Name) {
        player1 = Player(player1Name, "X");
        player2 = Player(player2Name, "O");

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
            gameStatus = "win";
            return "win";
        }

        if (checkTie()) {
            gameStatus = "tie";
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
        const startBtn = document.querySelector(".start");

        squares.forEach(square => {
            square.addEventListener("click", () => {
                Game.move(square.dataset.index)
                renderBoard();
                displayInfo();
            })
        });

        startBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const playerOneInput = document.getElementById("name1");
            const playerTwoInput = document.getElementById("name2");

            if (!playerOneInput.value || !playerTwoInput.value) {
                return;
            }

            Game.startGame(playerOneInput.value, playerTwoInput.value);
            renderBoard();
            displayInfo();
        });
    }

    const displayInfo = function () {
        const playerName = Game.getCurrentPlayer().name;
        const playerMarker = Game.getCurrentPlayer().marker;
        const gameStatus = Game.getGameStatus();

        const currentPlayerDisplay = document.querySelector(".current-player");
        const gameStatusDisplay = document.querySelector(".status");

        currentPlayerDisplay.textContent = `${playerName}'s turn. (${playerMarker})`

        if (gameStatus === "win") {
            currentPlayerDisplay.textContent = "";
            gameStatusDisplay.classList.remove("hidden");
            gameStatusDisplay.classList.remove("tie");
            gameStatusDisplay.classList.add("win");
            gameStatusDisplay.textContent = `${playerName} (${playerMarker}) wins!`;
        } else if (gameStatus === "tie") {
            currentPlayerDisplay.textContent = "";
            gameStatusDisplay.classList.remove("hidden");
            gameStatusDisplay.classList.remove("win");
            gameStatusDisplay.classList.add("tie");
            gameStatusDisplay.textContent = "Tie";
        } else {
            gameStatusDisplay.textContent = "";
            gameStatusDisplay.classList.remove("win", "tie");
            gameStatusDisplay.classList.add("hidden");
        }
    }

    return { createBoard, renderBoard, addEventListeners, displayInfo }
})();

DisplayController.createBoard();
DisplayController.addEventListeners();