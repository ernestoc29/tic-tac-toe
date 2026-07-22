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

        console.log("Game started")
    };

    const move = function (index) {
        if (gameStatus !== "playing") {
            console.log("Game is over");
            return;
        };

        const playerMove = Gameboard.placeMarker(index, currentPlayer.marker);

        if (!playerMove) {
            console.log("Invalid move")
            console.log(Gameboard.getBoard());
            return false;
        }

        console.log("Valid move");

        if (checkWin()) {
            console.log(`${currentPlayer.name} wins`)
            gameStatus = "complete";
            console.log(Gameboard.getBoard());
            return;
        } 
        
        if (checkTie()) {
            console.log("Tie")
            gameStatus = "complete";
            console.log(Gameboard.getBoard());
            return;
        }

        switchPlayers();
        console.log(Gameboard.getBoard());

        return true;
    };

    const switchPlayers = function () {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }

        console.log(`${currentPlayer.name}'s turn`)
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

    return { startGame, move, switchPlayers, checkWin, checkTie }
})();