function Parent(name){
  this.name = name;
  this.colors =  ['red','blue','green'];
}

Parent.prototype.getName = function(){
  console.log(this.name);
}
function Child(name,age){
  Parent.call(this,name);
  this.age = age;
}

var F = function(){}
F.prototype = Parent.prototype;
Child.prototype = new F();

var Child1 = new Child('kevin',18);
console.log(Child1)




// 封装一下

function prototype(child,parent){
  var p = object(parent.prototype)
  p.constructor = child;
  child.prototype = p
}

function object(o){
  var F = function(){}
  F.prototype = o;
  return new F();

}