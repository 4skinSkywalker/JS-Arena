function solution({g, s}) {
    var n = g.length;
    var INF = Number.POSITIVE_INFINITY;
    var distances = Array(n).fill(INF);
    distances[s] = 0;
    var visited = new Set();
  
    while (visited.size < n) {
        var min_distance = INF;
        var min_vertex = -1;
        for (let v = 0; v < n; v++) {
            if (!visited.has(v) && distances[v] < min_distance) {
                min_distance = distances[v];
                min_vertex = v;
            }
        }

        visited.add(min_vertex);

        for (let neighbor = 0; neighbor < n; neighbor++) {
            if (g[min_vertex][neighbor] != -1) {
                var new_distance = distances[min_vertex] + g[min_vertex][neighbor];
                if (new_distance < distances[neighbor]) {
                    distances[neighbor] = new_distance;
                }
            }
        }
    }

    return distances;
}

module.exports = solution;