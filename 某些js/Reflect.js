/**
 * 
 * Reflect.js  ES6
 * 
 * 
 * ，1：Reflect上面的一些方法并不是专门为对象设计的，
 * 比如Reflect.apply方法，它的参数是一个函数，
 * 如果使用Object.apply(func)会让人感觉很奇怪。
 * 
 *  2：用一个单一的全局对象去存储这些方法，能够保持其它的JavaScript
 * 代码的整洁、干净。不然的话，这些方法可能是全局的，或者要通过原型来调用。
 * 
 *  3：将一些命令式的操作如delete，in等使用函数来替代，这样做的目的是为了让代码更加好维护，
 * 更容易向下兼容；也避免出现更多的保留字。
 * 
 * 
 */


// Reflect.apply
// Reflect.construct
// Reflect.defineProperty
// Reflect.deleteProperty
// Reflect.enumerate // 废弃的
// Reflect.get
// Reflect.getOwnPropertyDescriptor
// Reflect.getPrototypeOf
// Reflect.has
// Reflect.isExtensible
// Reflect.ownKeys
// Reflect.preventExtensions
// Reflect.set
// Reflect.setPrototypeOf


/**
 * Reflect.apply(target,thisArgument,argumentsList);
 * 
 * target 目标函数
 * thisArgument是绑定的对象,
 * argumentsList就是函数的参数列表
 */
const arr = [1, 3, 5, 7];
let max;
//ES6
max = Reflect.apply(Math.max, undefined, arr);
console.log(max);
//ES5
max = Math.max.apply(undefined, arr);
console.log(max);
max = Function.prototype.apply.call(Math.max, undefined, arr);
console.log(max);

/**
 * Reflect.construct(target, argumentsList[, newTarget])
 * 提供了一种不使用new来调用构造函数的方法;
 *  target表示被运行的目标函数
 *  argumentsList调用构造函数传递的参数数组或者伪数组
 *  newTarget参数为构造函数 表示使用Reflect.construct后生成的对象是谁的实例,如果没有传递第三个参数，默认和target一样.
 */
// ES5
function A(name) {
  console.log('Function A is invoked!');
  this.name = name || 'dreamapple';
}
A.prototype.getName = function () {
  console.log(this.name);
  return this.name;
};

function B(age) {
  console.log('Function B is invoked!');
  this.age = age || 22;
}
B.prototype.getAge = function () {
  console.log(this.age);
  return this.age;
};
// 使用函数A作为构造函数
let a = Reflect.construct(A, ['happy']);
// 使用函数B作为构造函数
let b = Reflect.construct(A, ['happy'], B);
console.log(a);
console.log(b);
a.getName();
b.getAge(); //undefined

console.log('---------');

// ES6
class A1 {
  constructor(name) {
    console.log('Class A1 is invoked!');
    this.name = name || 'dreamapple';
  }
  getName() {
    console.log(this.name);
    return this.name;
  }
}
class B1 {
  constructor(age) {
    console.log('Class B1 is invoked!');
    this.age = age || 22;
  }
  getAge() {
    console.log(this.age);
    return this.age;
  }
}
// 使用A1类作为构造函数
let a1 = Reflect.construct(A1, ['happy']);
// 使用B1类作为构造函数
let b1 = Reflect.construct(A1, ['happy'], B1);
console.log(a1);
console.log(b1);



/**
 * Reflect.defineProperty(target, propertyKey, attributes)
 * @return {boolean} 返回值是一个boolean
 * target表示要定义属性的对象;
 * propertyKey表示要定义或者修改的属性名字;
 * attributes表示定义或者被修改的属性的属性
 * 
 * 属性：
 * configurable：false  只有属性是true时，该属性描述符才能改变，同时该属性也能从对应的对象上呗删除。默认为false;
 * enumerable：false。  只有属性是true时，该属性才能够出现在对象的枚举属性中
 * value:undefined,     该属性对应的值
 * writable:false，     是否会被赋值运算符改变；
 * 
 * get
 * set(value)
 * 
 */
let obj = {};
// 对象的属性定义失败
try {
  Object.defineProperty(null, 'a', {
    value: 22
  })
} catch (e) {
  console.log('define property failed!');
} // define property failed!

// 使用Object.defineProperty成功的定义
let obj1 = Object.defineProperty(obj, 'name', {
  enumerable: true,
  value: 'dreamapple'
});
console.log(obj); // { name: 'dreamapple' }
console.log(obj1); // { name: 'dreamapple' }

// 这里会返回false 因为我们上面定义name这个属性是不可修改的,
// 然后我们又在这里修改了name属性,所以修改失败返回值为false
let result1 = Reflect.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: true,
  value: 'happy'
});
console.log(result1); // false
let result2 = Reflect.defineProperty(obj, 'age', {
  configurable: true,
  enumerable: true,
  value: 22
});
console.log(result2); // true
console.log(obj); // { name: 'dreamapple', age: 22 }


/**
 * Reflect.deleteProperty(target, propertyKey)
 *  删除一个对象上的属性 
 *  @returns {Boolean} 
 */
let obj = {
  name: 'dreamapple',
  age: 22
};

let r1 = Reflect.deleteProperty(obj, 'name');
console.log(r1); // true
let r2 = Reflect.deleteProperty(obj, 'name');
console.log(r2); // true
let r3 = Reflect.deleteProperty(Object.freeze(obj), 'age');
console.log(r3); // false
// Reflect.enumerate // 废弃的

/**
 * Reflect.get(target, propertyKey[, receiver])
 *  target时目标对象
 *  receiver值得是this带表的上下文
 */
let obj = {
  name: 'dreamapple',
  age: 22,
  get money() {
    console.log(`I can tell you my name ${this.name}, but not my money`);
    return 0
  }
};
console.log(Reflect.get(obj, 'name')); // dreamapple
console.log(Reflect.get(obj, 'myName')); // undefined
// I can tell you my name dreamapple, but not my money
// 0
console.log(Reflect.get(obj, 'money'));
// I can tell you my name happy, but not my money
// 0
console.log(Reflect.get(obj, 'money', {
  name: 'happy'
}));

/**
 * Reflect.getOwnPropertyDescriptor(target, propertyKey)
 * 如果这个属性存在属性描述符的话就返回这个属性描述符；如果不存在的话，就返回undefined
 * 如果第一个参数不是对象的 Object.getOwnPropertyDescriptor会自动将其转化为一个对象 Reflect.getOwnPropertyDescriptor则会报错
 */
let obj = {
  'age': 11
};

Reflect.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'dreamapple'
});

let descriptor = Reflect.getOwnPropertyDescriptor(obj, 'name');
// { value: 'dreamapple',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
let descriptor2 = Reflect.getOwnPropertyDescriptor(obj, 'age');
// {
//   configurable: true
//   enumerable: true
//   value: 11
//   writable: true
// }
console.log(descriptor);

let d1 = Reflect.getOwnPropertyDescriptor(obj, 'age');
console.log(d1); // undefined

// 如果第一个参数不是对象
let d2 = Object.getOwnPropertyDescriptor('0', 'name');
console.log(d2); // undefined

try {
  let d3 = Reflect.getOwnPropertyDescriptor('0', 'name');
  console.log(d3);
} catch (e) {
  console.log('error');
} // error

/**
 * Reflect.getPrototypeOf(target) 
 * 与Object.getPrototypeOf一样 返回对象的原型
 */

// ES5
function A() {}
A.prototype.sayHello = function () {};

var a = new A();
var aPrototype = Object.getPrototypeOf(a);
console.log(aPrototype);
// Object
//  constructor: A()
//  sayHello: ()
//  __proto__: Object

// ES6
let ap = Reflect.getPrototypeOf(a);
console.log(ap);
// Object
//  constructor: A()
//  sayHello: ()
//  __proto__: Object

console.log(ap === aPrototype); // true

/**
 * Reflect.has(target, propertyKey) 
 * 这个方法相当于ES5的in操作符，就是检查一个对象上是否含有特定的属性；
 */

// 不作举例 ~ 懒的一匹


/**
 * Reflect.isExtensible(target)
 * 判断一个对象是否是可扩展的
 * 
 * 我们可以通过3中Object的方法使其变为不可扩展的
 * Object.seal()
 * Object.freeze();
 * Object.preventExtensions();
 * 
 */
let obj = {};
let r1 = Reflect.isExtensible(obj);
console.log(r1); // true
// 密封这个对象
Object.seal(obj);
let r2 = Reflect.isExtensible(obj);
console.log(r2); // false
// 冻结一个对象
let obj1 = Object.freeze({});
let r3 = Reflect.isExtensible(obj1);
console.log(r3); // false
// 阻止一个对象添加新的属性
let obj2 = {};
Object.preventExtensions(obj2);
let r4 = Reflect.isExtensible(obj2);
console.log(r4); // false

// Reflect.isExtensible 与 Object.isExtensible的区别
try {
  Reflect.isExtensible(1);
} catch (e) {
  // 这里捕获错误
  console.log(e); // Reflect.isExtensible called on non-object...
}

try {
  Object.isExtensible(1);
} catch (e) {
  console.log(e);
}

/**
 * Reflect.ownKeys(target)
 * 返回由目标对象自身的属性键组成的数组
 */
let a = Symbol.for('a');
let b = Symbol.for('b');

let obj = {
  [a]: 10,
  [b]: 20,
  key1: 30,
  key2: 40
};

let arr1 = Object.getOwnPropertyNames(obj);
console.log(arr1); // [ 'key1', 'key2' ]
let arr2 = Object.getOwnPropertySymbols(obj);
console.log(arr2); // [ Symbol(a), Symbol(b) ]
let arr3 = Reflect.ownKeys(obj);
console.log(arr3); // [ 'key1', 'key2', Symbol(a), Symbol(b) ]

/** 
 * Reflect.preventExtensions
 * 阻止新的属性添加到对象中去。
 * 
 */

/**
 *  Reflect.set(target, propertyKey, value[, receiver])
 *  这个函数的作用是在对象设置一个属性
 * 
 *  target表示我们要操作的对象
 *  propertyKey表示我们要设置的属性名
 *  value表示我们要设置的属性值
 *  receiver表示的是一个this值，如我们在设置值得时候遇到setter函数，那么这个receiver值表示的是setter中的this值
 * 
 *  @returns {Boolean} 设置是否成功
 *  
 */
let obj = {
  set name(name) {
    console.log('this: --> ', this);
  },
  age: 22
};

let r1 = Reflect.set(obj, 'age', 24);
console.log(r1); // true
console.log(obj); // { name: [Setter], age: 24 }

console.log('\n');
let r2 = Reflect.set(obj, 'name', 'dreamapple', {
  test: 'test'
}); // this: -->  { test: 'test' }
console.log(r2); // true
console.log(obj); // { name: [Setter], age: 24 }

/**
 * Reflect.setPrototypeOf(target, prototype)
 * 
 * 设置一个对象的原型
 */