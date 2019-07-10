const isUSDFormat = (str) => (/^\$([1-9]\d{0,2}(,\d{3})*|0)(\.\d{2})?$/).test(str)

console.log(isUSDFormat('$1')) // => true
console.log(isUSDFormat('$1.0')) // => false
console.log(isUSDFormat('$100,000.00')) // => true
console.log(isUSDFormat('$0,000.00')) // => false
console.log(isUSDFormat('$0.00')) // => true
console.log(isUSDFormat('$11,23,345.33')) // => false
console.log(isUSDFormat('$1,123,345.33')) // => true