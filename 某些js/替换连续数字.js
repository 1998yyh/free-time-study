/**
 * 要求：数组连续的部分用~替换
 * 如1,2,3,4,5,6,7 => 1~7;
 */

// 初始化数组 => 排序+去重
let arr = [2,1,5,6,7,3,10,21,22,20,19,8,2,2,2]
arr = [...new Set(arr)]
arr.sort((a,b)=>a-b)

let newArr = [];
let result = [];
let flag = 1;
for(let i=0;i<arr.length;i++){
  if(flag === arr[i]){
    newArr.push(flag)
    flag = arr[i] + 1;
  }else{
    flag = arr[i];
    result.push(newArr);
    newArr = [flag];
    flag++;
  }
}
result.push(newArr);
let p = [];
result.forEach(function(index){
  if(index.length>=2){
    p.push(`${index[0]}~${index[index.length-1]}`)
  }else{
    p.push(index[0])
  }
})
