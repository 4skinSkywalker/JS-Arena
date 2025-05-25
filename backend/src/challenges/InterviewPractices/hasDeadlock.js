function solution({connections}) {
    const WHITE = 0, GRAY = 1, BLACK = 2;
    let color = Array.from(Array(connections.length), () => WHITE);

    function dfs(node) {
        color[node] = GRAY;
        for (let neighbor of connections[node]) {
            if (color[neighbor] === GRAY) {
                return true;
            }
            if (color[neighbor] === WHITE && dfs(neighbor)) {
                return true;
            }
        }
        color[node] = BLACK;
        return false;
    }

    for (let node = 0; node < connections.length; node++) {
        if (color[node] === WHITE && dfs(node)) {
            return true;
        }
    }
    return false;
}

module.exports = solution;