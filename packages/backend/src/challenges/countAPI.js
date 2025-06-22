function solution({calls}) {
    let apiTree = {};

    for (let call of calls) {
        let parts = call.slice(1).split('/');
        const [project, subproject, method] = parts;

        if (!(project in apiTree)) {
            apiTree[project] = { 'count': 0, 'subprojects': {} };
        }

        apiTree[project]['count'] += 1;

        if (!(subproject in apiTree[project]['subprojects'])) {
            apiTree[project]['subprojects'][subproject] = { 'count': 0, 'methods': {} };
        }

        apiTree[project]['subprojects'][subproject]['count'] += 1;

        if (!(method in apiTree[project]['subprojects'][subproject]['methods'])) {
            apiTree[project]['subprojects'][subproject]['methods'][method] = 0;
        }

        apiTree[project]['subprojects'][subproject]['methods'][method] += 1;
    }

    let output = [];

    for (let [project, projectData] of Object.entries(apiTree)) {
        output.push(`--${project} (${projectData.count})`);

        for (let [subproject, subprojectData] of Object.entries(projectData.subprojects)) {
            output.push(`----${subproject} (${subprojectData.count})`);

            for (let [method, count] of Object.entries(subprojectData.methods)) {
                output.push(`------${method} (${count})`);
            }
        }
    }

    return output;
}

module.exports = solution;