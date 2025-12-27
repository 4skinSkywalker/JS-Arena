function solution({path}) {
    var stack = [];
    var directories = path.split('/');
    
    for (var i = 0; i < directories.length; i++) {
        if (directories[i] === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else if (directories[i] && directories[i] !== '.') {
            stack.push(directories[i]);
        }
    }
    
    // Construct the simplified path
    var simplified_path = '/' + stack.join('/');
    
    return simplified_path;
}

module.exports = solution;