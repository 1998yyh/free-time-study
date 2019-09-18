/**
 *  new
 */

// Otaku 御宅族，简称宅
function Otaku(name, age) {
  this.name = name;
  this.age = age;
  this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin

/**
 * 因为 new 是一个关键字 我们不能像之前那样直接去覆盖
 *  所以我们写一个函数来模拟new的效果，用的时候是这样的：
 *  function Otaku() {}
 *  var person = new Otaku(...)
 *  var person = objectFactory(Otaku,...);
 */

function objectFactory(){
  var obj = new Object(),
      Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj,arguments);
  return typeof ret === 'object' ? ret : obj;
}
