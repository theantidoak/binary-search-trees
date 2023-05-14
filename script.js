const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = this._removeDuplicates(array);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  _removeDuplicates(array) {
    const [...newArray] = new Set(array);
    newArray.sort((a, b) => a - b);
    return newArray;
  }

  buildTree(array, left, right) {
    if (left > right) return null;
  
    const mid = parseInt((left + right) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, left, mid - 1);
    node.right = this.buildTree(array, mid + 1, right);
  
    return node;
  }

  insertNode(value, root=this.root) {
    if (root == null) {
      root = new Node(value);
      return root;
    }
  
    if (value < root.data) {
      root.left = this.insertNode(value, root.left);
    } else if (value > root.data) {
      root.right = this.insertNode(value, root.right);
    }

    return root;
  }

  _getMinValue(root) {
    let min = root.data;
  
    if (root.data != null) {
      min = root.left.data;
      root = root.left;
    }
  
    return min;
  }

  deleteNode(value, root = this.root) {
    if (root == null) {
      return root;
    }
  
    if (value < root.data) {
      root.left = this.deleteNode(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteNode(value, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }
  
      root.data = this._getMinValue(root.right);
      root.right = this.deleteNode(root.right, root.data);
    }
  
    return root;
  }

  find(value, root = this.root) {
    if (root == null) {
      return root;
    }

    let target;
    if (value === root.data) {
      target = root;
    } else if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    }

    return root;
  }

  levelOrder(fn) {
    
  }
  
}

const test = new Tree(arr);

test.insertNode(40);
test.deleteNode(9);

prettyPrint(test.root);
prettyPrint(test.find(67));


