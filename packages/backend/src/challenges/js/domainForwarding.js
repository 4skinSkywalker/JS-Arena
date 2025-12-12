function solution(redirects) {
    // Create a dictionary to store the final redirect for each domain
    let final_redirects = {}
    for (let i=0; i<redirects.length; i++) {
        let domain = redirects[i][0],
            redirect = redirects[i][1];
        // If the redirect is not in the dictionary, add it
        if (!(redirect in final_redirects)) {
            final_redirects[redirect] = redirect
        }
        // Update the final redirect for the domain
        final_redirects[domain] = final_redirects[redirect]
        // Update the final redirect for all domains that point to the current redirect
        for (let key in final_redirects) {
            if (final_redirects[key] === domain) {
                final_redirects[key] = final_redirects[domain]
            }
        }
    }
    
    // Create a dictionary to store the domains for each final redirect
    let groups = {}
    for (let domain in final_redirects) {
        let final_redirect = final_redirects[domain]
        // If the final redirect is not in the dictionary, add it
        if (!(final_redirect in groups)) {
            groups[final_redirect] = []
        }
        // Add the domain to the group
        groups[final_redirect].push(domain)
    }
    
    // Sort the domains in each group
    for (let group in groups) {
        groups[group].sort()
    }
    
    // Sort the groups by the final redirect and return them
    return Object.values(groups).sort((a, b) => final_redirects[a[0]] < final_redirects[b[0]] ? -1 : 1)
}

module.exports = solution;