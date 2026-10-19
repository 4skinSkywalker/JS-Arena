function solution({ver1: v1, ver2: v2}) {
    const [j1, j2] = [v1, v2].map(v =>
        +v.split`.`.map(x => x.padEnd(3, "0")).join``
    );
    return j1 > j2;
}

module.exports = solution;