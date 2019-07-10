/**
 *  判断是否
 *  
 */

const obj = {
  ap: {
    love: {
      yh: {
        sex: {
          age: 11
        }
      }
    }
  }
}



const get = function (obj, key) {
  return key.split('.').reduce(function (o, x) {
    return (typeof o == 'undefined' || o === null) ? o : o[x];
  }, obj)
}

const has = function (obj, key) {
  return key.split('.').every(function (x) {
    if (typeof obj != 'object' || obj === null || !x in obj) {
      return false
    }
    obj = obj[x];
    return true;
  })
}

console.log(has(obj, 'ap.love.yh.age'))