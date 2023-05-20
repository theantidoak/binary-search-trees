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

  levelOrder(root) {
    if (root == null) {
      return root;
    }

    let q = [];
    let valueArray = [root.data];
    let counter = 0;
    q.push(root);

    while (q.length > counter) {
      let child = q[counter];

      if (child.left !== null) {
        q.push(child.left);
        valueArray.push(child.left.data);
      }
      if (child.right !== null) {
        q.push(child.right);
        valueArray.push(child.right.data);
      }

      counter++;
    }

    return valueArray;
  }

  inorder(root, q=[], valueArray=[]) {
    if (root == null) {
      return valueArray;
    }

    q.push(root);

    if (root.left !== null) {
      this.inorder(root.left, q, valueArray);
    }

    valueArray.push(root.data);

    if (root.right !== null) {
      this.inorder(root.right, q, valueArray);
    }

    return valueArray;
  }

  preorder(root, q=[], valueArray=[root.data]) {
    if (root == null) {
      return valueArray;
    }

    q.push(root);

    if (root.left !== null) {
      valueArray.push(root.left.data);
      this.preorder(root.left, q, valueArray);
    }
    if (root.right !== null) {
      valueArray.push(root.right.data);
      this.preorder(root.right, q, valueArray);
    }

    return valueArray;
  }

  postorder(root, q=[], valueArray=[]) {
    if (root == null) {
      return valueArray;
    }

    q.push(root);

    if (root.left !== null) {
      this.postorder(root.left, q, valueArray);
    }
    
    if (root.right !== null) {
      this.postorder(root.right, q, valueArray);
    }

    valueArray.push(root.data);

    return valueArray;
  }

  height(node, counterL=0, counterR=0) {

    if (node == null) {
      return counterL;
    }

    if (node.left !== null) {
      counterL++;
      counterL = this.height(node.left, counterL, counterR);
    }

    if (node.right !== null) {
      counterR++;
      counterR = this.height(node.right, counterL, counterR);
    }

    return counterR > counterL ? counterR : counterL;
  }

  depth(node) {
    const nodeHeight = this.height(node);
    const rootHeight = this.height(this.root);

    return rootHeight - nodeHeight;
  }

  isBalanced(node) {
    if (node == null) {
      return;
    }

    if (node.left !== null) {
      this.isBalanced(node.left);
      
      const leftHeight = this.height(node.left);
      const rightHeight = node.right == null ? null : this.height(node.right);
      const diff = rightHeight ? leftHeight - rightHeight : null;

      if ((!rightHeight && this.depth(node.left) > 1) || (diff && diff > 1 && diff < -1)) {
        return false;
      }
    }
    
    if (node.right !== null) {
      this.isBalanced(node.left);
      
      const rightHeight = this.height(node.right);
      const leftHeight = node.left == null ? null : this.height(node.left);
      const diff = leftHeight ? rightHeight - leftHeight : null;

      if ((!leftHeight && this.depth(node.right) > 1) || (diff && diff > 1 && diff < -1)) {
        return false;
      }
    }

    return true;
  }

  rebalance(node) {
    if (node == null) {
      return;
    }

    const balanced = isBalanced(node);

    if (!balanced) {
      const newSortedArray = this._removeDuplicates(this.preorder(node));
      this.root = this.buildTree(newSortedArray, 0, newSortedArray.length - 1);
      this.buildTree(newSortedArray, 0, newSortedArray.length - 1);
    }

    return node;
  }
}

const test = new Tree(arr);

test.insertNode(40);
test.deleteNode(9);

prettyPrint(test.root);
// prettyPrint(test.find(67));

// console.log(test.inorder(test.root));
// console.log(test.preorder(test.root));
// console.log(test.postorder(test.root));
// console.log(test.height(test.root));
// console.log(test.depth(test.root.left.left.right));
console.log(test.isBalanced(test.root))