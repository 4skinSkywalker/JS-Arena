function solution(shoes) {
    let sizeTypesMap = {};

    for (const [type, size] of shoes) {
        sizeTypesMap[size] = sizeTypesMap[size] || [];
        sizeTypesMap[size].push(type);
    }

    for (const [size, types] of Object.entries(sizeTypesMap)) {
        if (types.filter(t => t === 0).length !== types.filter(t => t === 1).length) {
            return false;
        }
    }

    return true;
}

module.exports = solution;