const a = {}
const b = 1
const c = 'ScriptOJ'

const set1 = new Set([a, b, c])
const set2 = new Set([a, c, b])
const isSameSet = (s1, s2) => [...s1].every(o=>s2.has(o)) && [...s2].every(o=>s1.has(o))

console.log(isSameSet(set1, set2)) // => true
