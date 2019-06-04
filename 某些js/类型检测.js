/**
 * 
 * 利用Object.prototype.toString.call() 输出的[Object xxxxx]
 * 创建一个对象 然后对应相应的 类型
 * 
 * 来源：JQuery ， 掘金谁写的忘了
 */
const class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

export default type = (obj) => {
  if (obj == null) {
      return obj + "";
  }
  
  return typeof obj === "object" || typeof obj === "function" ?
      class2type[Object.prototype.toString.call(obj)] || "object" :
      typeof obj;
}