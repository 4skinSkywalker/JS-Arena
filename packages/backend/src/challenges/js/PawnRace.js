function solution({white, black, toMove}) {
    let white_position = parseInt(white[1]);
    let black_position = parseInt(black[1]);
    if (white[0] === black[0] && white_position < black_position) {
        return "draw";
    }

    let equal_position = {2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2};
    let can_capture = Math.abs(white.charCodeAt(0) - black.charCodeAt(0)) === 1;

    if (can_capture) {
        if (white_position + 1 === black_position) {
            return (toMove === "w") ? "white" : "black";
        }
        if (white_position === 2 && black_position === 7) {
            return (toMove === "w") ? "black" : "white";
        }

        if (white_position === 2) {
            if (toMove === "b") {
                black_position -= 1;
            }
            if (white_position + 1 === black_position) {
                return "white";
            }
            let winner1 = mock_game(white_position + 1, black_position, toMove);
            let winner2 = mock_game(white_position + 2, black_position, toMove);
            return (winner1 === "white" || winner2 === "white") ? "white" : "black";
        }

        if (black_position === 7) {
            if (toMove === "w") {
                white_position += 1;
            }
            if (white_position + 1 === black_position) {
                return "black";
            }
            let winner1 = mock_game(white_position, black_position - 1, toMove);
            let winner2 = mock_game(white_position, black_position - 2, toMove);
            return (winner1 === "black" || winner2 === "black") ? "black" : "white";
        }

        return mock_game(white_position, black_position, toMove);
    } else {
        black_position = equal_position[black_position];
        white_position += (white_position === 2 ? 2 : 1);
        black_position += (black_position === 2 ? 2 : 1);

        if (white_position === black_position) {
            return (toMove === "w") ? "white" : "black";
        }

        return (white_position > black_position) ? "white" : "black";
    }
}

function mock_game(white_position, black_position, toMove) {
    while (white_position !== 8 && black_position !== 1) {
        white_position += (toMove === "w" ? 1 : 0);
        black_position -= (toMove === "b" ? 1 : 0);
        if (white_position + 1 === black_position) {
            return (toMove === "w") ? "black" : "white";
        }

        if (white_position === 8) {
            return "white";
        }
        if (black_position === 1) {
            return "black";
        }

        black_position -= (toMove === "w" ? 1 : 0);
        white_position += (toMove === "b" ? 1 : 0);
        if (white_position + 1 === black_position) {
            return (toMove === "w") ? "white" : "black";
        }
    }

    return (white_position === 8) ? "white" : "black";
}

module.exports = solution;