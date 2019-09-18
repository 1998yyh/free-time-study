var handler = {
  get:function(target,name) {
    if(name === 'prototype'){
      return Object.prototype;
    }
    return 'Hello,' + name;
  },

  apply:function(target, thisBinding, args) {
    return args[0];
  },

  construct:function(target, args) {
    return {value:args[1]}
  }
}

var fproxy = new Proxy(function(x,y){
  return x+y;
},handler)

console.log(fproxy(1,2));
console.log(new fproxy(1,2));

console.log(fproxy.prototype = Object.prototype);
console.log(fproxy.foo === 'Hello, foo');