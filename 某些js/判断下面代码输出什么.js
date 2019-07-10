// 使用``进行函数调用  第一个参数是字符串本身（作为一个数组）,模板字符串不算
//        如果有其他参数，是模板字符传中的变量；

function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = "Lydia";
const age = 21;

// var result = getPersonInfo`${person} is ${age} years old`;
// var re = getPersonInfo`go`
// console.log(result)
// console.log(re)
// getPersonInfo`${1}${2}${3}`

// var s = new Set([1,2,3,4,5])
// console.log(s)
const name = "Lydia";
String.prototype.giveLydiaPizza = () => {
  return "Just give Lydia pizza already!";
};



console.log(name.giveLydiaPizza());
