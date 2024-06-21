const User = require('../model/user');
const getReferralTree = require('./referralTree');
const getDownlines = require('./downliner');

async function findFirstEmptyDownline(rootUsername) {
  const referralTree = await getReferralTree(rootUsername);

  if (referralTree.length === 0) {
    return { upline: rootUsername, position: 'downliner1' };
  }

  for (let level = 0; level < referralTree.length; level++) {
    const currentLevel = referralTree[level];

    for (let i = 0; i < currentLevel.length; i++) {
      if (currentLevel[i] === "Empty") {
        const parentIndex = Math.floor(i / 2);
        const parentUsername = level === 0 ? rootUsername : referralTree[level - 1][parentIndex];
        const position = (i % 2 === 0) ? 'downliner1' : 'downliner2';
        return { upline: parentUsername, position: position };
      }
    }
  }

  let currentLevel = referralTree[referralTree.length - 1];
  while (currentLevel.length > 0) {
    const nextLevel = [];
    for (let i = 0; i < currentLevel.length; i++) {
      if (currentLevel[i] === "Empty") {
        const parentIndex = Math.floor(i / 2);
        const parentUsername = referralTree[referralTree.length - 2][parentIndex];
        const position = (i % 2 === 0) ? 'downliner1' : 'downliner2';
        return { upline: parentUsername, position: position };
      } else {
        const downlines = await getDownlines(currentLevel[i]);
        nextLevel.push(downlines[0] || "Empty", downlines[1] || "Empty");
      }
    }
    referralTree.push(nextLevel);
    currentLevel = nextLevel;
  }

  const lastLevel = referralTree[referralTree.length - 1];
  for (let i = 0; i < lastLevel.length; i++) {
    const parentIndex = Math.floor(i / 2);
    const parentUsername = referralTree[referralTree.length - 2][parentIndex];
    const position = (i % 2 === 0) ? 'downliner1' : 'downliner2';
    if (lastLevel[i] === "Empty") {
      return { upline: parentUsername, position: position };
    }
  }

  return null;
}

module.exports = findFirstEmptyDownline;