const Gameboard = (() => {
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]

    const getBoard = function () {
        return board;
    };

    const placeMark = function (index, playerMarker) {
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

    return { getBoard, placeMark, reset };
})();

function Player(name, marker) {
    return { name, marker } 
}