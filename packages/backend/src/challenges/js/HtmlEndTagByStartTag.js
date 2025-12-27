function solution({startTag}) {
    startTag = startTag.match("<[^\\s/>]+")[0];
    return startTag[0] + "/" + startTag.slice(1) + ">";
}

module.exports = solution;