function solution({line}) {
    line = line.replace(/_/g, '').toUpperCase();
    if (/^\d+$/.test(line)) {
        return true;
    }
    
    const m = line.match(/^(\d+?)#([0-9a-fA-F]+)#$/);
    if (!m) {
        return false;
    }

    const charset = "01234567890ABCDEF";
    if (!(new RegExp(`^[${charset.slice(0, m[1])}]*$`)).test(m[2])) {
        return false;
    }

    return parseInt(m[2], m[1]) == null ? false : true;
}

module.exports = solution;