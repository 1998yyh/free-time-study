// 节流初始版
function jl1(fnc,wait){
  var context,args;
  var previous = 0;

  return function() {
    var now = +new Date();
    context = this;
    args = arguments;
    if(now-previous > wait) {
      fnc.apply(context,args);
      previous = now;
    }
  }
}


// 第二版
function jl2(fnc,wait) {
  var timer;
  var previous = 0;
  
  return function(){
    context = this;
    args = arguments;
    if(!timeout) {
      timeout = setTimeout(function(){
        timer = null;
        fnc.apply(context,args)
      },wait)
    }
  }
}


// 最终版 
function jl3(fnc,wait,options) {
  var timeout, context, args, result;
  var previous = 0;
  if(!options) options = {};

  var later = function() {
    previous = options.leading === false?0:new Date().getTime();
    timeout = null;
    fnc.apply(context,args)
    if(!timeout) context = args = null;
  }

  var throttle = function() {
    var now = new Date().getTime();
    if(!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if ( remaining <= 0 || remaining > wait ){
      if(timeout) {
        clearTimeout
      }
    }
  }
}