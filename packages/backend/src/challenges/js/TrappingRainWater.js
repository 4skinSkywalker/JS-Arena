function solution({height}) {
    return (
        m = Math.max(...height),
        Array.from({ length: m }, () => Array.from({ length: height.length }))
            .map((a, i) =>a.map((b, j) => (i < m-height[j]) ? ' ' : '#').join(""))
            .reduce((a, b) => (a += b.replace(/(?<=#)[^#]+(?=#)/g, m => "w".repeat(m.length)) + "\n", a), "")
    )
}

module.exports = solution;