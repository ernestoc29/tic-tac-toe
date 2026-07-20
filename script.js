const Gameboard = (() => {
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]

    const getBoard = function() {
        return board;
    };

    const placeMark = function (index, playerMark) {
        if (!board[index]) {
            board[index] = playerMark;
            return true;
        } else {
            return false;
        }
    };

    const reset = function() {
        board = [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
    };

    return { getBoard, placeMark, reset };
})();

const player