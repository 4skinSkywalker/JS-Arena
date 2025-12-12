function solution({boardSize, initPosition, initDirection, k}) {
    var pointer = 0;
    var points = new Set();

    while (pointer < k) {
        var point = getPositionPoint(initPosition, initDirection);

        if (points.has(point)) {
            k %= pointer;
            pointer = 0;
            break;
        }
        
        pointer += 1;
        points.add(point);
        getNextPosition(boardSize, initPosition, initDirection);
    }

    while (pointer < k) {
        pointer += 1;
        getNextPosition(boardSize, initPosition, initDirection);
    }

    return initPosition;
}

function getPositionPoint(initPosition, initDirection) {
    var point = 0;
    point += initPosition[0];
    point += initPosition[1] * 100;
    point += initDirection[0] * 10000;
    point += initDirection[1] * 1000000;
    return point;
}

function getNextPosition(boardSize, position, direction) {
    var nextRow = position[0] + direction[0];
    var nextCol = position[1] + direction[1];
    var isRowValid = 0 <= nextRow && nextRow < boardSize[0];
    var isColValid = 0 <= nextCol && nextCol < boardSize[1];
    if (isRowValid) {
        position[0] = nextRow;
    } else {
        direction[0] *= -1;
    }
    if (isColValid) {
        position[1] = nextCol;
    } else {
        direction[1] *= -1;
    }
}

module.exports = solution;