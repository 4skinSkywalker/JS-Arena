function solution({lrcLyrics, songLength}) {
    let ret = [];

    lrcLyrics.forEach((l, i) => {
        let sep = l.indexOf(']');
        let [t, tf] = l.slice(1,sep).split('.');
        let [m, s] = t.split(':').map(Number);
        let h = Math.floor(m / 60);
        m = m % 60;
        let ct = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${tf}0`;

        if (i > -1) {
            ret[i*4 - 2] += ct;
            ret.push('');
        }
        ret.push(String(i+1),`${ct} --> `, l.slice(sep + 2));
    });

    ret[ret.length - 2] += `${songLength},000`;
    ret.shift();
    return ret;
}

module.exports = solution;