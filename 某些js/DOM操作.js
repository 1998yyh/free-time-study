/**
 * 1 addEventListener()
 */

window.addEventListener('click', function () {
  /** do somethings */
}, {
  capture: true, //冒泡还是捕获
  once: true, //执行一次
  passive: true, //永远不会执行preventDafult
}) // options


/**
 * scrollTo 平滑滚动
 * 
 */

window.scrollTo({
  top: 400,
  left0,
  behavior: 'smooth' // auto跳过去 smooth
})

/**
 * setTimeout setInterval 的参数问题
 *  
 * requestAnimationFrame 基于时序动画
 */


//  requestAnimationFrame 示例 这个比setinterval更流畅

// var l = 10;
// function step() {
//   l += 10;
//   xx.style.left = l + 'px';
//   if (l < 1000) {
//     window.requestAnimationFrame(step)
//   }
// }
// window.requestAnimationFrame(step)

function foo(a, b) {
  return a + b;
}
setTimeout(foo, 100, 3, 4); // 100ms后执行foo函数 并传入两个参数 3,4


/**
 * defaultChecked  找出当初默认选中的
 * 
 */
console.log(radioButton.checked); // true
radioButton.checked = false;
console.log(radioButton.checked); // false
console.log(radioButton.defaultChecked) //true

/**
 * encode docode encodeURIComponent decodeURIComponent
 * 用于解码由 encodeURIComponent 方法或者其它类似方法编码的部分统一资源标识符（URI）
 */

decodeURIComponent("JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B");

/**
 * normalize()  wholeText  
 * 
 * 
 */


/*  设置光标位置
 * @params {Object} ele 输入框元素
 * @params {Number} pos 需要将光标设置的位置
 * @author *** 2018/09/29
 * */
function setCaretPosition(ele, pos) {
  if (ele.setSelectionRange) {
    ele.focus()
    /* 选中输入框指定位置文本
     * selectionStart 起始位置
     * selectionEnd 终点位置
     * */
    ele.setSelectionRange(pos, pos)
  } else if (ele.createTextRange) { // IE
    let range = ele.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}

/* 获取光标在输入框中相对位置
 * @param {object} [ele] 输入框元素对象（input/textarea）
 * @return {int} 光标所处位置（根据字符长度值）
 * @author *** 2018/09/29
 *  */
function getCaretPosition(ele) {
  let cursorPos = 0
  if (document.selection) { // IE
    const selectRange = document.selection.createRange()
    selectRange.moveStart('character', -ele.value.length)
    cursorPos = selectRange.text.length
  } else if (ele.selectionStart || ele.selectionStart === '0') {
    cursorPos = ele.selectionStart
  }
  return cursorPos
}

/**
 * insertAdjacentHTML insertAdjacentElement insertAdjacentText
 * 插入 html 文本 元素（元素这个是移动）
 * 效率比 innerHTML 快
 * 实测 100 次循环 80ms - 2ms 
 *      1000 次4000ms - 12ms
 */
var a = document.querySelector('.a')
var b = document.querySelector('.b')
var c = document.querySelector('.c')

a.insertAdjacentElement('beforebegin',c) //如此操作元素
// 'beforebegin'
// 元素自身的前面。
// 'afterbegin'
// 插入元素内部的第一个子节点之前。
// 'beforeend'
// 插入元素内部的最后一个子节点之后。
// 'afterend'
// 元素自身的后面。



/**
 *  event.detail
 *  event.detail 可以记录连续点击的次数 如果双击 event.detail = 2
 * 
 */


