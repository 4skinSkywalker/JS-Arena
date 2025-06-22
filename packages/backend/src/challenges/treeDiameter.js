function dfs(node, graph, visited, dist) {
    visited[node] = true;
    for(let neighbor of graph[node]) {
        if (!visited[neighbor]) {
            dist[neighbor] = dist[node] + 1;
            dfs(neighbor, graph, visited, dist);
        }
    }
}

function solution({n, tree}) {
    let graph = {};
    for(let i=0; i<tree.length; i++) {
        let u = tree[i][0];
        let v = tree[i][1];

        if(!graph[u]) graph[u] = [];
        if(!graph[v]) graph[v] = [];

        graph[u].push(v);
        graph[v].push(u);
    }

    let visited = Array(n).fill(false);
    let dist = Array(n).fill(0);

    dfs(0, graph, visited, dist);

    let u = dist.indexOf(Math.max(...dist));

    visited = Array(n).fill(false);
    dist = Array(n).fill(0);

    dfs(u, graph, visited, dist);
    
    return Math.max(...dist);
}

module.exports = solution;