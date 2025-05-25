function solution({sequence}) {
    function merge(sequence, left, middle, right) {
        var result = [];

        var i = left;
        var j = middle;
        while (i < middle && j < right) {
            if (sequence[i] < sequence[j]) {
                result.push(sequence[i]);
                i += 1;
            } else {
                result.push(sequence[j]);
                j += 1;
            }
        }

        while (i < middle) {
            result.push(sequence[i]);
            i += 1;
        }

        while (j < right) {
            result.push(sequence[j]);
            j += 1;
        }

        for (var i = left; i < right; i++) {
            sequence[i] = result[i - left];
        }
    }

    function split(sequence, left, right) {
        var middle = Math.floor((left + right) / 2);

        if (right - left <= 1) {
            return;
        }
            
        split(sequence, left, middle);
        split(sequence, middle, right);
        merge(sequence, left, middle, right);
    }

    split(sequence, 0, sequence.length);

    return sequence;
}

module.exports = solution;