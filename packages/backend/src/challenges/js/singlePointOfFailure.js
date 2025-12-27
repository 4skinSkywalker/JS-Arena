function solution({connections}) {
    var n = connections.length;
    var visited = new Array(n).fill(0);
    var low = new Array(n).fill(0);
    var disc = new Array(n).fill(0);
    var parent = new Array(n).fill(-1);
    var bridges = [0];

    function bridgeUtil(u, visited, parent, low, disc, Time) {
        visited[u] = true;
        disc[u] = Time[0];
        low[u] = Time[0];
        Time[0] += 1;
        for (var v = 0; v < n; v++) {
            if (connections[u][v] == 1) {
                if (!visited[v]) {
                    parent[v] = u;
                    bridgeUtil(v, visited, parent, low, disc, Time);
                    low[u] = Math.min(low[u], low[v]);
                    if (low[v] > disc[u]) {
                        bridges[0] += 1;
                    }
                } else if (v !== parent[u]) {
                    low[u] = Math.min(low[u], disc[v]);
                }
            }
        }
    }

    for (var i = 0; i < n; i++) {
        if (!visited[i]) {
            bridgeUtil(i, visited, parent, low, disc, [0]);
        }
    }

    return bridges[0];
}

module.exports = solution;