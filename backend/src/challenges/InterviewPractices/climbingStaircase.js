function solution({n, k}) {
    var res = [];
    function dfs(n, path, res){
        if(n === 0){
            res.push(path);
            return;
        }
        for(var i = 1; i <= Math.min(k, n); i++){
            dfs(n - i, path.concat([i]), res);
        }
    }
    dfs(n, [], res);
    return res;
}

module.exports = solution;