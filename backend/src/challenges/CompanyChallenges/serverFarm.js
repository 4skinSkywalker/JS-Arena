function solution({jobs, servers}) {
    let server_jobs = Array(servers).fill().map(() => []);
    let server_times = Array(servers).fill(0);

    let indexed_jobs = jobs.map((job, index) => [index, job]);

    indexed_jobs.sort((a, b) => b[1] - a[1] || a[0] - b[0]);

    for (let [index, time] of indexed_jobs) {
        let next_server = server_times.indexOf(Math.min(...server_times));
        server_jobs[next_server].push(index);
        server_times[next_server] += time;
    }

    return server_jobs;
}

module.exports = solution;