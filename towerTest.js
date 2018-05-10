'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece = (startStack, endStack) => {
  return stacks[endStack].push(stacks[startStack].pop());
  // Your code here

}

const isLegal = (startStack, endStack) => {
  if (stackTest(startStack, endStack)) {
    let startTest = stacks[startStack][stacks[startStack].length - 1];
    let endTest = stacks[endStack][stacks[endStack].length - 1];

    if ((startTest < endTest) || (stacks[endStack].length === 0)) {
      return true;
    } else {
      console.log('Invalid');
      return false;
    }
  } else {
    console.log('Invalid');
    return false;
  }
}
// Your code here

const checkForWin = () => {
  if (stacks.c.length === 4) {
    return true;
  } else {
    return false;
  }
}
// Your code here

const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
  }
  if (checkForWin()) {
    console.log('winner winner chicken dinner');
    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: []
    };
  }
}
// Your code here

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
