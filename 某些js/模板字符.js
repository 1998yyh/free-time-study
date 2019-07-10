/**
 * 某日某天 我突然发现函数+``竟然可以直接去调用;
 * 所以 …… 
 * 第一个参数是模板字符串 第二个参数 是${}中的变量
 * 
 */
const yourName = 'ScriptOJ'
const myName = 'Jerry'

const highlight = (literals, ...values) => {
  var output = '';
  for (var index = 0; index < values.length; index++) {
    output += literals[index] + `<span class="red">${values[index]}</span>`
  }
  output += literals[index]
  return output
}

console.log(highlight `Hello, ${yourName}. I am ${myName}.`)