/**
 *  执行上下文栈
 */

var ECStack = [];
/**
 * 
 * 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，
 * 就会将函数的执行上下文从栈中弹出。知道了这样的工作原理，让我们来看看如何处理上面这段代码：
 * 
 */
var scope = "global scope";

function checkscope() {
  var scope = "local scope";

  function f() {
    return scope;
  }
  return f();
}
checkscope();
// ECStack.push(<checkscope> functionContext);
// ECStack.push(<f> functionContext);
// ECStack.pop();
// ECStack.pop();

var scope = "global scope";

function checkscope() {
  var scope = "local scope";

  function f() {
    return scope;
  }
  return f;
}
checkscope()();
// ECStack.push(<checkscope> functionContext);
// ECStack.pop();
// ECStack.push(<f> functionContext);
// ECStack.pop();