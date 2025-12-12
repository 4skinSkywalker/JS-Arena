function solution(city) {
    const n = city.length;
    const dist = Array.from(Array(n), () => new Array(n).fill(Infinity));

    for (let i = 0; i < n; i++){
        dist[i][i] = 0;
    }

    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (city[i][j] != -1) {
                dist[i][j] = city[i][j];
            }
        }
    }

    for (let k = 0; k < n; k++){
        for (let i = 0; i < n; i++){
            for (let j = 0; j < n; j++){
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }

    return dist[0][n - 1];
}

module.exports = solution;