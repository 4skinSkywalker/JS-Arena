function solution({table, row, column}) {
    const rows = [...table.matchAll(/<tr>(.*?)<\/tr>/g)].map(r => r[1]);
    const cells = rows.map(row => [...row.matchAll(/<td>(.*?)<\/td>/g)].map(c => c[1]));
    try {
        return cells[row][column];
    } catch (e) {
        return "No such cell";
    }
}

module.exports = solution;