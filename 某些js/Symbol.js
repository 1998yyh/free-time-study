/**
 *  Symbol 
 * 
 */

Symbol(); //symbol
console.log(Symbol()); // 输出"Symbol()"至控制台
console.assert(typeof Symbol() === 'symbol');
new Symbol() //TypeError: Symbol is not a constructor

//  Symbols拥有内置的 debug 能力
//  symbols可以指定一个描述，当我们能够输出更有用的信息到控制台时，我们的编程体验更为友好；
console.log(Symbol('foo')); //输出 "symbol(foo)" 至控制台
console.assert(Symbol('foo').toString() === 'Symbol(foo)');

// Symbols 能被用作对象的 key
// 这是 Symbols 真正有趣之处。他们和对象紧密的交织在一起。Symbols 能用作对象的key （类似字符串key）
// 这意味着你可以分配无限多的具有唯一性的Symbols到一个对象上，这些key保证不会和现有的字符串key冲突或其他symbol key冲突；

var myObj = {};
var fooSym = Symbol('foo');
var otherSym = Symbol('bar');
myObj['foo'] = 'bar';
myObj[fooSym] = 'baz';
myObj[otherSym] = 'bing';
console.assert(myObj.foo === 'bar');
console.assert(myObj[fooSym] === 'baz');
console.assert(myObj[otherSym] === 'bing');

/**
 *  另外，Symbol key 无法通过for in、for of或者 Object.getOwnPropertyNames 获得他们的唯一方式是 Object.getOwnPropertySymbols;
 * 
 */

var fooSym = Symbol('foo');
var myObj = {};
myObj['foo'] = 'bar';
myObj[fooSym] = 'baz';
Object.keys(myObj);
Object.getOwnPropertyNames(myObj);
Object.getOwnPropertySymbols(myObj);
console.assert(Object.getOwnPropertySymbols(myObj)[0] === fooSym);

/**
 *  Symbols 能够为对象提供一个隐藏层,帮助对象实现了一种全新的目的 -- 属性不可迭代，也不能狗通过现有的反射工具获得，并且能被保证不会和对象
 *   任何已有属性冲突
 */

// Symbol 是唯一的 ……………… 等等，也有例外 
var myObj = {};
var fooSym = Symbol.for('foo');
var otherSym = Symbol.for('foo');
myObj[fooSym] = 'baz';
myObj[otherSym] = 'bing';
console.assert(fooSym === otherSym);
console.assert(myObj[fooSym] === 'bing')
console.assert(myObj[otherSym] === 'bing')
// 以上都通过
// Symbol创建的 Symbol 是可跨域的
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
assert.notEqual(iframe.contentWindow.Symbol, Symbol);
assert(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')); // true!

/**
 *  Symbol.for() 与 Symbol.keyFor()
 *  Symbol.for() 在全局注册中心上，如果找到了就返回它，否则，新建一个与该键关联的Symbol, 并放入全局Symbol注册表中。
 * 
 *  Symbol.keyFor() 方法用来获取 symbol 注册表中与某个 symbol 关联的键。
 * 
 */

/**
 * Symbols 是什么，又不是什么?
 * 1).Symbols绝不会与对象字符串key冲突。这一特性让 Symbol 在扩展已有对象时表现卓著，他不会显式地影响到对象；
 * 2).Symbols无法通过现有的反射工具读取。需要Object.getOwnPropertySymbols()来访问对象上的Symbols。
 * 3).Symbols不是私有的。作为双刃剑的另一面 —— 对象上的所有的Symbols都可以直接通过 Object.getOwnPropertySymbols() 获得
 * 4).可枚举的Symbols能够被复制到其他对象。
 * 5).Symbols不能强制类型转换为原始对象
 * 6).Symbols并不是1唯一的
 * 
 */

/**
 * Symbol 适合什么
 * 1).作为一个可替换字符串 或者 整型使用的唯一值，比如日志级别：
 * 2).作为一个对象中放置元信息（metadata）的场所
 * 3).给予开发者在 API 中为对象添加钩子（hook）的能力
 * 
 */

// Symbol.hasInstance: instanceof