function solution({n, network}) {
    // Create an adjacency list from the network
    let adj = Array.from({length: n + 1}, () => []);
    for(let [u, v, w] of network) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    // Initialize the distance array and the priority queue
    let dist = Array(n + 1).fill(Infinity);
    dist[1] = 0;
    let queue = [[0, 1]];

    while(queue.length) {
        queue.sort((a, b) => a[0]- b[0]);
        let [d, u] = queue.shift();
        if(d != dist[u]){
            continue;
        }
        for(let [v, w] of adj[u]) {
            if(dist[u] + w < dist[v]){
                dist[v] = dist[u] + w;
                queue.push([dist[v], v]);
            }
        }
    }

    // Return the shortest path from node 1 to node n
    return dist[n];
}

module.exports = solution;