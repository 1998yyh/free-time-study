//栈
class stack {
  constructor (...items) {
    this.reverse = false;
    this.stack = [...items];
  }

  push(...items) {
    return this.reverse?this.stack.unshift(...items):this.stack.push(...items)
  }

  pop() {
    return this.reverse?this.stack.shift():this.stack.pop();
  }
}

//队列
class Queue {
  constructor(...items) {
      this.reverse = false;
      this.queue = [...items];
  }

  enqueue(...items) {
      return this.reverse
          ? this.queue.push(...items)
          : this.queue.unshift(...items);
  }

  dequeue() {
      return this.reverse ? this.queue.shift() : this.queue.pop();
  }
}

/**
 * 单链表
 * push(value)  -在链表的末尾/头部添加一个节点
 * pop()        -在链表的末尾/头部删除一个节点
 * get(index)   -返回指定索引出的节点
 * delete(index)-删除指定索引处的节点
 * isEmpty()    -根据列表长度返回true或false
 * print()      -返回链表的可见表示
 * 
 */

class Node {
  constructor(data){
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(data){
    const node = new Node(data);

    if(this.head === null) {
      this.head = node;
      this.tail = node;
    }
    this.tail.next = node
    this.taile = node
    this.length++ 
  }

  pop(){
    if(this.isEmpty()){
      return null;
    }
    if(this.head === this.tail){
      this.head = null;
      this.tail = null;
      this.length--;
      return this.tail;
    }
    let node = this.tail;
    let currentNode = this.head;
    let penultimate;

    while(currentNode) {
      if(currentNode.next === this.tail) {
        penultimate = currentNode;
        break;
      }
      currentNode = currentNode.next;
    }

    penultimate.next = null;
    this.tail = penultimate;
    this.length--;
    return node;
  }

  get(index){
    if(index === 0) {
      return this.head;
    }

    if(index < 0 || index > this.length) {
      return null;
    }

    let currentNode = this.head;
    let i = 0;
    while(i < index) {
      i++;
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  
  delete(index) {
    let currentNode = this.head;

    if(index === 0){
      let deleteNode;
      currentNode.next = this.head;
      deleteNode = currentNode;
      this.length--;

      return deleteNode;
    }

    if(index < 0 || index > this.length) {
      return null;
    }

    let i = 0;
    let previous;
    
    while(i < index) {
      i++;
      previous = currentNode;
      currentNode = currentNode.next;
    }
    previous.next = currentNode.next;
    this.length--;
    return currentNode;
  }

  isEmpty() {
    return this.length === 0;
  }

  print() {
    const list = [];
    let currentNode = this.head;
    while(currentNode) {
      list.push(currentNode.data)
      currentNode = currentNode.next;
    }
    return list.join('=>')
  }
}


const l = new LinkedList();

const values = ['A','B','C']

values.forEach(value => l.push(value))
console.log(l)

//双向链表

class Node2 {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(item) {
    let node = new Node2(item);
    if(!this.head) {
      this.head = node;
      this.tail = node;
    }else{
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
  }

  appendAt(pos, item){
    let current = this.head;
    let counter = 1;
    let node = new Node2(item);

    if(pos == 0) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }else{
      while(current) {
        current = current.next;
        if( counter == pos ) {
          node.prev = current.prev;
          current.prev.next = node;
          node.next = current;
          current.prev = node;
        }
        counter++;
      }
    }
  }

  remove(item) {
    let current = this.head;
    while(current){
      if(current.data === item) {
        if(current == this.head && current == this.tail){
          this.head = null;
          this.tail = null;
        }else if( current == this.head){
          this.head = this.head.next;
          this.head.prev = null;
        }else{
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
      }
      current = current.next;
    }
  }

  removeAt( pos ) {
    let current = this.head;
    let counter = 1;
    if( pos =0 ) {
      this.head = this.head.next;
      this.head.prev = null;
    }else{
      while( current ) {
        current = current.next;
        if ( current == this.tail ) {
          this.tail = this.tail.prev;
          this.tail.next = null;
        }else if( counter == pos ) {
          current.prev.next = current.next;
          current.next.prev = current.prev;
          break;
        }
        counter++;
      }
    }
  }

  reverse() {
    let current = this.head;
    let prev = null;
    while( current ) {
      let next = current.next;
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
    }
    this.tail = this.head;
    this.head = prev;
  }

  swap( nodeOne, nodeTwo ) {
    let current = this.head;
    let counter = 0;
    let firstNode;
    while( current !== null ) {
      if( counter == nodeOne ) {
        firstNode = current;
      }else if( counter == nodeTwo ) {
        let temp = current.data;
        current.data = firstNode.data;
        firstNode.data = temp;
      }
      current = current.next;
      counter++;
    }
    return true;
  }

  length() {
    let current = this.head;
    let counter = 0;
    while( current !== null ) {
      counter++;
      current = current.next;
    }
    return counter;
  }

  isEmpty() {
    return this.length() < 1;
  }

  traverse( fn ) {
    let current = this.head;
    while( current !== null ) {
      fn(current)
      current = current.next;
    }
    return true;
  }

  search( item ) {
    let current = this.head;
    let counter = 0;
    while( current ) {
      if( current.data == item) {
        return counter;
      }
      current = current.next;
      counter++;
    }
    return false;
  }
}


class Node3{
  constructor(data) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  //各种操作：
  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      (!root.left) ? root.left = newNode : this.insertNode(root.left, newNode)
    } else {
      (!root.right) ? root.right = newNode : this.insertNode(root.right, newNode)
    }
  }

  insert(value) {
    let newNode = new Node3(value)
    //如果没有根节点
    if(!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  
  removeNode(root, value) {
    if(!root) {
      return null;
    }

    // 从该值小于根节点开始判断
    if(value < root.value) {
      root.left = this.removeNode(root.left, value)
      return root;
    } else {
      //如果没有左右节点
      if(!root.left && !root.right) {
        root = null;
        return root;
      }

      //存在左右节点
      if(root.left) {
        root = root.left;
        return root;
      } else if (root.right) {
        root = root.right;
        return root;
      }

      let minRight = this.findMinNode(root.right)
      root.value = minRight.value;
      //确保删除已替换的节点
      root.right = this.removeNode(root.right, minRight.value)
      return root
    }
  }
  
  remove(value) {
    if(!this.root) {
      return "Tree is empty"
    } else {
      this.removeNode(this.root, value)
    }
  }

  findMinNode(root) {
    if(!root.left) {
      return root;
    } else {
      return this.findMinNode(root.left)
    }
  }

  searchNode(root, value) {
    if(!root) {
      return null
    }

    if(value < root.value) {
      return this.searchNode(root.left, value)
    } else if (value > root.value) {
      return this.searchNode(root.right, value)
    }
    return root;
  }

  search(value) {
    if(!this.root) {
      return 'Tree is empty'
    } else {
      return Boolean(this.searchNode(this.root, value))
    }
  }

  //前序遍历
  prevOrder(root) {
    if(!root) {
      return 'Tree is empty'
    } else {
      console.log(root.value)
      this.prevOrder(root.left)
      this.prevOrder(root.right)
    }
  }

  //中序遍历
  inOrder(root) {
    if(!root) {
      return 'Tree is empty'
    } else {
      this.inOrder(root.left)
      console.log(root.value)
      this.inOrder(root.right)
    }
  }

  //后序遍历
  postOrder(root) {
    if(!root) {
      return 'Tree is empty'
    } else {
      this.postOrder(root.left)
      this.postOrder(root.right)
      console.log(root.value)
    }
  }
}

//Graph
class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  // 操作方法
  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, []);
    } else {
      throw 'Already Exist!!!'
    }
  }

  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if(this.AdjList.has(node)) {
        let arr = this.AdjList.get(vertex);
        // 若果通过，将边值添加到顶点
        if(!arr.includes(node)) {
          arr.push(node);
        } else {
          throw `Can't add non-existing vertex -> '${node}' `
        } 
      } else {
        throw `You should add '${vertex}' first`
      }
    }
  }

  // 打印图
  print() {
    for (let [key, value] of this.AdjList) {
      console.log(key, value)
    }
  }

  createVisitedObject() {
    let arr = {};
    for(let key of this.AdjList.keys()) {
      arr[key] = false;
    }
    return arr;
  }

  bfs(startingNode) {
    let visited = this.createVisitedObject
    let q = [];

    visited[startingNode] = true;
    q.push(startingNode);

    while(q.length) {
      let current = q.pop();

      console.log(current);
      let arr = this.AdjList.get(current);

      for(let elem of arr) {
        if(!visited[elem]) {
          visited[elem] = true;
          q.unshift(elem)
        }
      }
    }
  }
  
  dfs(startingNode) {
    console.log('\nDFS');
    let visited = this.createVisitedObject();
    this.dfsHelper(startingNode, visited);
  }

  dfsHelper(startingNode, visited) {
    visited[startingNode] = true;
    console.log(startingNode)

    let arr = this.AdjList.get(startingNode)

    for(let elem of arr) {
      if(!visited[elem]) {
        this.dfsHelper(elem, visited);
      }
    }
  }

  dosePathExist(firstNode, searchNode) {
    let path = [];
    let visited = this.createVisitedObject();
    let q = [];
    visited[firstNode] = true;
    q.push(firstNode);
    while(q.length) {
      let node = q.pop();
      path.push(node);
      let elements = this.AdjList.get(node);
      if(elements.includes(searchNode)) {
        console.log(path.join('->'))
        return true;
      } else {
        for(let elem of elements) {
          if(!visited[elem]) {
            visited[elem] = true;
            q.unshift(elem)
          }
        }
      }
    }
    return false;
  }
}

// let g = new Graph();
// let arr = ['A','B','C','D','E','F']
// for (let i = 0; i < arr.length; i++) {
//   g.addVertex(arr[i])
// }
// g.addEdge('A', 'B')
// g.addEdge('A', 'D')
// g.addEdge('A', 'E')
// g.addEdge('B', 'C')
// g.addEdge('D', 'E')
// g.addEdge('E', 'F')
// g.addEdge('E', 'C')
// g.addEdge('C', 'F')
// g.print()
// g.dfs('E')


class prefixTreeNode {
  constructor(value) {
    this.children = {};
    this.endWord = null;
    this.value = value;
  }
}

class PrefixTree extends ProcessingInstruction {
  constructor() {
    super(null)
  }
}
