function solution({table, coords}) {
    table = table.map(i => i.split(''));

    let col = table[0].map((j, i) => j === '+' ? i : -1).filter(i => i !== -1);
    let row = table.map((j, i) => j[0] === '+' ? i : -1).filter(i => i !== -1);

    let x = Math.min(coords[0][1], coords[1][1]);
    let m = Math.max(coords[0][1], coords[1][1]);
    
    let y = Math.min(coords[0][0], coords[1][0]);
    let n = Math.max(coords[0][0], coords[1][0]);
    
    let g = col[x]+1;
    let h = col[m+1];
    
    let p = row[y]+1;
    let q = row[n+1];
    
    let k = table.length;
    let l = table[0].length;

    // Remove walls inside
    for (let i = p; i < q; i++) {
        for (let j = g; j < h; j++) {
            if (["|", "+", "-"].includes(table[i][j])) {
                table[i][j] = " ";
            }
        }
    }

    // Fix top
    for (let i = g; i < h; i++) {
        if (table[p-1][i] === "+" && (!table[p-2] || table[p-2][i] !== "|")) {
            table[p-1][i] = "-";
        }
    }
    
    // Fix right
    for (let j = p; j < q; j++) {
        if (table[j][h] === "+" && (!table[j][h+1] || table[j][h+1] !== "-")) {
            table[j][h] = "|";
        }
    }
    
    // Fix bottom
    for (let i = g; i < h; i++) {
        if (table[q][i] === "+" && (!table[q+1] || table[q+1][i] !== "|")) {
            table[q][i] = "-";
        }
    }

    // Fix left
    for (let j = p; j < q; j++) {
        if (table[j][g-1] === "+" && (!table[j][g-2] || table[j][g-2] !== "-")) {
            table[j][g-1] = "|";
        }
    }

    return table.map(x => x.join(''));
}

module.exports = solution;