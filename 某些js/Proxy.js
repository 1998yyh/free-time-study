/**
 *  Proxy:
 * 
 *  proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，
 * 所以属于一种‘元编程’
 * 
 * proxy可以理解成，在目标对象之前架设一层‘拦截’，外界对该对象的访问，都必须通过这层拦截，
 * 因此提供了一种机制，可以对外界的访问进行过滤和改写。
 * 
 */
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
obj.count = 1;
++obj.count;


// const proxy = new Proxy({},{
//   get:function(){
//     return 35;
//   }
// })

// console.log(proxy.name) //35
// console.log(proxy.aa) //35
// console.log(proxy.ss) //35

var target = {};
var handler = {
  get(){
    return 35;
  }
};

var proxy = new Proxy(target,handler);
console.log(proxy.a)

var object = { proxy: new Proxy(target,handler) };
console.log(object)
var proxy  = new Proxy({},{
  get:function(){
    return 35;
  }
})

let obj1 = Object.create(proxy)
console.log(obj1.time)