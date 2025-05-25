function solution({domains}) {
    const labels = {".com": "commercial", ".org": "organization", ".net": "network", ".info": "information"};
    let result = [];
    for (let domain of domains) {
        let topLevelDomain = "." + domain.split(".").pop();
        result.push(labels[topLevelDomain]);
    }
    return result;
}

module.exports = solution;