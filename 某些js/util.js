// 1.检测是不是除了 symbol 以外的原始数据
function isStatic(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  )
}
// 2.检测数据是不是原始数据
function isPrimitive(value) {
  return isStatic(value) || typeof value === 'symbol'
}
// 3.判断数据是不是引用类型的数据 (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))
function isObject(value) {
  let type = typeof value;
  return value !== null && (type == 'object' || type == 'function');
}
// 4.检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}
// 5.获取数据类型，返回结果为 Number、String、Object、Array等
function getRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
// 6.判断数据是不是Object类型的数据
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}


// 7.判断数据是不是数组类型的数据
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
// 将isArray挂载到Array上
Array.isArray = Array.isArray || isArray;