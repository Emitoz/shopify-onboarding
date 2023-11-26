class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor (value){
    const newNode = new Node(value);
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop(){
    if (!this.head) return undefined;
    let temp = this.head;
    let pre = this.head;
    while(temp.next) {
      pre = temp;
      temp = temp.next;
    }
    this.tail = pre;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return temp;
  }

  unshift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  shift() {
    if (!this.head) return undefined;
    let currentHead = this.head;
    this.head = this.head.next;
    currentHead.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return currentHead;
  }

  get(index) {
    if (index < 0 || index >= this.length) return 'Index out of range';
    let currNode = this.head;
    for (let i = 0; i < index; i++) {
      currNode = currNode.next;
    }
    return currNode;
  }

  set(index, value) {
    if (index < 0 || index >= this.length) return false;
    let currNode = this.get(index);
    if (currNode) {
      currNode.value = value;
      return true;
    }
    return false;
  }

  insert(index, value) {
    if (index === 0) return this.unshift(value);
    if (index === this.length) return this.push(value);
    if (index < 0 || index > this.length) return undefined;

    const newNode = new Node(value);
    const prevNode = this.get(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.get(index - 1);
    const temp = prevNode.next;
    prevNode.next = temp.next;
    temp.next = null;
    this.length--;
    return temp;
  }

  reverse() {
    let tempHead = this.head;
    this.head = this.tail;
    this.tail = tempHead;

    let next = tempHead.next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = tempHead.next;
      tempHead.next = prev;
      prev = tempHead;
      tempHead = next;
    }
    return this;
  }

  findMiddleNode () {
    if (!this.head) return undefined;
    if (this.head.next === null) return this.head;

    let slowNode = this.head;
    let fastNode = this.head;

    while (fastNode && fastNode.next) {
      slowNode = slowNode.next;
      fastNode = fastNode.next.next;
    }

    return slowNode;
  }

  showSet() {
    let current = this.head;
    
  }

}

let myLinkedList = new LinkedList(1);
myLinkedList.push(2);
myLinkedList.push(3);
myLinkedList.push(1);
myLinkedList.push(4);
// myLinkedList.reverse();

// console.log("Linkedlist: ", myLinkedList);