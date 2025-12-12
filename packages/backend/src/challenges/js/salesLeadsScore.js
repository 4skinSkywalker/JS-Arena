function solution({names, time, netValue, isOnVacation}) {
    let sales_leads = names.map((n, i) => ({
        name: n,
        score: netValue[i] * time[i] / 365,
        time: time[i],
        vacation: isOnVacation[i]
    }));
    
    sales_leads = sales_leads.filter(lead => !lead.vacation);
    sales_leads.sort((a, b) => b.score - a.score || b.time - a.time || a.name.localeCompare(b.name));
    
    return sales_leads.map(lead => lead.name);
}

module.exports = solution;