/**
 *  call的思路
 * 
 */

 var obj = {
   value:1
 }

 var bar = function(name,age){
   console.log(this.value);
   console.log(name)
   console.log(age)
 }

//  bar.call(obj);

//  我们可以模拟一下上面的过程
//  其实就是obj里新增了一个方法
var obj = {
  value:1,
  bar:function(){
    console.log(this.value);
  }
}
// 这个时候 this 就指向了 foo，是不是很简单呢？
// 但是这样却给 foo 对象本身添加了一个属性，这可不行呐！
// 不过也不用担心，我们用 delete 再删除它不就好了~

obj.fn = bar;
// obj.fn();
Reflect.deleteProperty(obj,'fn')

Function.prototype.call2 = function(context) {
  var args = [];
  for(var i = 1;i<arguments.length;i++){
    args.push('arguments['+i+']')
  }
  context.fn = this;
  console.log(args)
  // eval('context.fn(' + args +')')
  context.fn(...args);
  delete context.fn;
}

// bar.call2(obj,'age','ds')  

// 上面用了eval 和 es6的扩展运算符 有点乱 直接看最终版
// 非 ES6
Function.prototype.call3 = function(context) {
  context = context || window;
  var args = [];
  for(var i = 1;i<arguments.length;i++){
    args.push('arguments['+i+']');
  }
  context.fn = this;
  var result = eval('context.fn('+args+')')
  delete context.fn;
  return result;
}

bar.call3(obj,'age','ds')  

// ES6
Function.prototype.call4 = function(c){
  c = c ||window;
  const args = [...arguments].slice(1);
  c.fn = this;
  const result = c.fn(...args);
  delete c.fn;
  return result;
}
bar.call4(obj,'age','ds')  


// apply
Function.prototype.apply1 = function(c,args){
  c = c || window;
  c.fn = this;
  const result = c.fn(...args);
  delete c.fn;
  return result;
}

bar.apply1(obj,['a','b'])
