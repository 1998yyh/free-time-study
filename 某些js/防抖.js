function fd1(fnc, wait) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fnc, wait);
  }
}

// 改变this指向
function fd2(fnc, wait) {
  var timer;
  return function () {
    var context = this;

    clearTimeout(timer)
    timer = setTimeout(() => {
      fnc.call(context)
    }, wait);
  }
}

// 解决events 隐式传入
function fd3(fnc, wait) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;

    clearTimeout(timer)
    timer = setTimeout(() => {
      fnc.apply(context, args)
    }, wait);
  }
}

// 增加一个立即执行:我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
function fd4(fnc, wait, immediate) {
  var tiemr;
  return function () {
    var context = this;
    var args = arguments;

    if (timer) clearTimeout(timer);
    if (immediate) {
      var flag = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if(flag) fnc.apply(context,args)
    } else {
      timer = setTimeout(() => {
        fnc.call(context.args)
      }, wait);
    }
  }
}