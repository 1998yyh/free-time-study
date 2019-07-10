/**
 *  操作URL的黑科技(不兼容 IE)
 *  URL: www.baidu.com/s?wd=蔡徐坤&skill=2019
 */

//   URLSearchParams
let url = 'www.baidu.com/?wd=蔡徐坤&skill=篮球&year=2019';
url = 'https://mp.weixin.qq.com/s/nJsM05Yp50HDH1hqEen2eQ'
let searchParams = new URLSearchParams(url);
console.log(searchParams)
for (let p of searchParams) {
  console.log(p);
}

//  并且可以通过 searchParams.get() 方法获取
searchParams.get('wd') // "蔡徐坤"
searchParams.get('skill') // "篮球"
searchParams.get('year') // "2019"


// searchParams.has() 判断是否有某个字段
searchParams.has('wd') // true
searchParams.has('age') // false


// searchParams.append 添加字段
searchParams.append('age',22);
console.log(searchParams.has('age')) // true

// searchParams.delete 删除字段
searchParams.delete('year');
searchParams.has('year')   // false

//  设置字段
searchParams.set('skill', '篮球 唱 跳 rap');


var sttr  = searchParams.toString();
console.log(sttr)