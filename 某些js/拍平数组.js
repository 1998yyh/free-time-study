
function* flatten2(arr) {
	arr = arr.length ? arr.toString().split(',').map(x => Number.parseInt(x)) : []
	for(let o of arr) yield o 
}

const numbers = flatten2([1, [[2], 3, 4], 5])
console.log(numbers.next().value) // => 1
console.log(numbers.next().value) // => 2
console.log(numbers.next().value) // => 3
console.log(numbers.next().value) // => 4
console.log(numbers.next().value) // => 5

