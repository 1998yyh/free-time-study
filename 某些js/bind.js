/**
 * bind
 *  bind函数有三个要点
 *  1.需要return一个函数
 *  2.可以分别在bind 和 调用的时候传参
 *  2.可以 new
 */

// var foo = {
//   value: 1
// }

// function bar() {
//   console.log(this.value);
// }

// var bindFoo = bar.bind(foo);

// bindFoo();

// Function.prototype.bind2 = function (context) {
//   var self = this;
//   return function () {
//     return self.apply(context)
//   }
// }
Function.prototype.bind2 = function (c) {
  var self = this;
  var args = Array.prototype.slice.call(arguments,1);
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  }
}

Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }
  fBound.prototype = this.prototype;
  return fBound;
}

var value = 2;
var foo = {
  value: 1,
}

function bar(name, age) {
  this.habbit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'kevin';
var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
console.log(obj.habbit);
console.log(obj.firend);

//  new的过程还是没懂 再看
Function.prototype.bind2 = function (context) {
	var self = this;
	var args = Array.prototype.slice.call(arguments, 1);

	var fBound = function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		// 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
		// 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
		// 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
		return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
	}
	// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
	fBound.prototype = this.prototype;
	return fBound;
}

// 最终版
Function.prototype.bind3 = function (context) {

  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}