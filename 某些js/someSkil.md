# String Skill
 
## 格式化金钱
```javascript
const thousand = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '');
const money = thousand(19941112)

//money => 19,941,112
```

## 生成随机ID
```javascript
const randomID = len => Math.random().toString(36).substr(3, len);
const id = randomID(10)

// id => "asdasdasdq"
```

## 生成随机HEX色值
```javascript	
const randomColor = () => '#' + Math.floor()const randomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = randomColor();
// color => "#f03665"
```

## 生成星级
```javascript
const startScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = startScore(3);
// start => "★★★"
```

## 操作URL查询参数
```javascript	
const params = new URLSearchParams(location.search); // location.search = "?name=yajun&sex=female"
params.has("yajun"); // true
params.get("sex"); // "female"
```

# Number Skill

## 取整


## 验证是否是数字
```javascript
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
```
# Array Skill

## 混淆数组

```javascript
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - .5); // 0-1 => -0.5-+0.5
// arr => [3, 4, 0, 5, 1, 2]
```


# Object Skill

## 删除属性
```javascript
const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj;
// rest => { b: 1, c: 2 }
```




# 数据结构

+ 数组：Array
+ 堆栈：Stack
+ 队列：Queue
+ 链表：Linked Lists
+ 树  ：Trees
+ 图  ：Graphs
+ 字典树：Trie
+ 散列表（哈希表）：Hash tables

## for...in
