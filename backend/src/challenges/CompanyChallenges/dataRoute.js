function solution({resource, server, network}) {
    let residual_graph = network.map(arr => arr.slice()), 
        parent = Array(network.length).fill(-1), 
        max_flow = 0;

    while (bfs(residual_graph, resource, server, parent)) {
        let path_flow = Infinity, 
            s = server;
            
        while (s !== resource) {
            path_flow = Math.min(path_flow, residual_graph[parent[s]][s]);
            s = parent[s];
        }

        let v = server;
        while (v !== resource) {
            let u = parent[v];
            residual_graph[u][v] -= path_flow;
            residual_graph[v][u] += path_flow;
            v = parent[v];
        }

        max_flow += path_flow;
    }

    return max_flow;
}

function bfs(residual_graph, source, sink, parent) {
    let visited = Array(residual_graph.length).fill(false), 
        queue = [source];
    visited[source] = true;

    while (queue.length>0) {
        let u = queue.shift();
        if (u === sink) return true;

        for(let ind = 0; ind < residual_graph[u].length; ind++){
            
            if (!visited[ind] && residual_graph[u][ind] > 0) {
                queue.push(ind);
                visited[ind] = true;
                parent[ind] = u;
            }
        }
    }

    return false;
}

module.exports = solution;