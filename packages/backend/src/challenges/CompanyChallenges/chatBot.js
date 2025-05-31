function solution({conversations, currentConversation}) {
    function getUniqueMatches(conv, currConvSet) {
        return conv.filter(value => currConvSet.has(value)).length;
    }

    let currentSet = new Set(currentConversation);
    let bestMatchIndex = -1;
    let bestMatchCount = 0;

    for (let i = 0; i < conversations.length; i++) {
        let conv = conversations[i];
        let uniqueMatches = getUniqueMatches(conv, currentSet);
        if (uniqueMatches > bestMatchCount) {
            bestMatchCount = uniqueMatches;
            bestMatchIndex = i;
        }
    }
    
    if (bestMatchCount === 0) {
        return currentConversation;
    }
    
    let bestConv = conversations[bestMatchIndex];
    let lastMatchingWordIndex = -1;

    for (let j = 0; j < bestConv.length; j++) {
        if (currentSet.has(bestConv[j])) {
            lastMatchingWordIndex = j;
        }
    }

    if (lastMatchingWordIndex !== -1 && lastMatchingWordIndex < bestConv.length - 1) {
        currentConversation = currentConversation.concat(bestConv.slice(lastMatchingWordIndex + 1));
    }

    return currentConversation;
}

module.exports = solution;