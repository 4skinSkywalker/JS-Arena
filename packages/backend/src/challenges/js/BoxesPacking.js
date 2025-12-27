function solution({length, width, height}) {
    var boxes = [];

    for (var i = 0; i < length.length; i++) {
        var box = [length[i], width[i], height[i]];
        box.sort(function(a, b) { return b - a; });
        boxes.push(box);
    }

    boxes.sort(function(a, b) {
        if (a[0] !== b[0]) return b[0] - a[0];
        if (a[1] !== b[1]) return b[1] - a[1];
        return b[2] - a[2];
    });

    for (var i = 1; i < boxes.length; i++) {
        if (boxes[i][0] >= boxes[i - 1][0]) {
            return false;
        }
        if (boxes[i][1] >= boxes[i - 1][1]) {
            return false;
        }
        if (boxes[i][2] >= boxes[i - 1][2]) {
            return false;
        }
    }

  return true;
}

module.exports = solution;