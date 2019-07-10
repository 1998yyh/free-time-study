/**
 * 
 */

var value = 1;
function foo(v) {
  v = 2;
  console.log(v);
}
foo(value);
console.log(value);
//  value = 2;

var obj = {
  value:1
};
function fooo(o) {
  o.value = 2;
  console.log(o.value);
}
fooo(obj);
console.log(obj.value)
// value = 2;

var obj2 = {
  value:1
}
function ffoo(o){
  o = 2;
  console.log(o);
}
ffoo(obj2)
console.log(obj2.value);
// value = 1;

/**
 * 原因是与存储方式有关
 * 1.值类型存储在栈中，引用类型，栈中存储属性名和地址路径，堆中存储地址路径和值;
 * 2.值类型直接修改
 * 3.对象类型，会创建一个一样的键值对，如果修改的路径 值修改本身，如果修改的内容，原值也会随着修改
 */