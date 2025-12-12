function solution({tasks, queries}) {
    function is_within_date_range(start, end, query_date) {
        return start <= query_date && query_date <= end;
    }

    const tasks_with_dates = tasks.map(task => [
        task[0], new Date(task[1]), new Date(task[2]),
        ...task.slice(3)
    ]);

    const result = [];

    queries.forEach(([person, query_date_str]) => {
        const query_date = new Date(query_date_str);
        const person_tasks = [];

        tasks_with_dates.forEach(task => {
            const [task_title, task_start_date, task_end_date, ...workers] = task;
            if (workers.includes(person) && is_within_date_range(task_start_date, task_end_date, query_date)) {
                person_tasks.push({ title: task_title, end: task_end_date });
            }
        });

        person_tasks.sort((a, b) =>
            a.end.getTime() === b.end.getTime() ? a.title.localeCompare(b.title) : a.end - b.end
        );
        const sorted_titles = person_tasks.map(task => task.title);

        result.push(sorted_titles);
    });

    return result;
}

module.exports = solution;