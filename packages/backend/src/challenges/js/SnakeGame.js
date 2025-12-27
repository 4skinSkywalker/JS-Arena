function solution({gameBoard, commands}) {
    const g = gameBoard;
    let direction = {'^': [-1, 0], '>': [0, 1], 'v': [1, 0], '<': [0, -1]};
    let left = '^<v>^';
    let right = '^>v<^';
    let row = g.length;
    let col = g[0].length;
    let res = Array.from({length: row}, () => Array(col).fill('.'));
    let valid = (x, y) => 0 <= x && x < row && 0 <= y && y < col;
    let stack = [];
    let snake = [];
    let seen = new Set();
    let curr;
    let head;

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if ('^>v<'.includes(g[i][j])) {
                if (!curr) {
                    curr = [i, j];
                    head = g[i][j];
                }
                stack.push([i, j]);
                seen.add(`${i},${j}`);
                while (stack.length) {
                    let [x, y] = stack.shift();
                    snake.push([x, y]);
                    for (let [dx, dy] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
                        if (valid(x + dx, y + dy) && !seen.has(`${x+dx},${y+dy}`) && g[x + dx][y + dy] === '*') {
                            seen.add(`${x+dx},${y+dy}`);
                            stack.push([x + dx, y + dy]);
                        }
                    }
                }
            }
        }
    }

    for (let d of commands) {
        if (d === 'F') {
            let k = snake.pop();
            let [i, j] = direction[head];
            curr = [curr[0] + i, curr[1] + j];
            if (valid(...curr) && !snake.some(([x, y]) => x === curr[0] && y === curr[1])) {
                snake.unshift(curr);
            } else {
                for (let [x, y] of [...snake, k]) {
                    res[x][y] = 'X';
                }
                return res;
            }
        } else {
            head = d === 'L' ? left[left.indexOf(head) + 1] : right[right.indexOf(head) + 1];
        }
    }

    let [i, j] = snake[0];
    res[i][j] = head;

    for (let [x, y] of snake.slice(1)) {
        res[x][y] = '*';
    }

    return res;
}

module.exports = solution;