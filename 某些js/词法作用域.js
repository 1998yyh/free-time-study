/**
 *  作用域是指程序源代码中定义变量的区域
 *  作用域规定了如何查找变量，也就是确定当前执行代码
 *  javascript采用词法作用域，也就是静态作用域
 */
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}
bar()

// eg:2
var scope = "global scope";

function checkscope() {
  var scope = "local scope";

  function f() {
    return scope;
  }
  return f();
}
checkscope(); // local scope

// eg:3
var scope = "global scope";

function checkscope() {
  var scope = "local scope";

  function f() {
    return scope;
  }
  return f;
}
checkscope()(); // local scope

/**
 * JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。
 * 嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，
 * 这种绑定在执行 f() 时依然有效。
 */