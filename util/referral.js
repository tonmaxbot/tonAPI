const User = require('../model/user');

async function updateTree(userId) {
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      let { username, walletAddress, balance, profit, upline, uplinerTree, level, point  } = user;
  
      let newProfit = 0;
  
      switch (level) {
        case 1:
          point++;
          balance += 0.5;
          if (point === 2) {
            point = 0;
            level++;
            newProfit = balance - 0.82;
          }
          break;
        case 2:
          point++;
          balance += 0.5;
          if (point === 4) {
            point = 0;
            level++;
            newProfit = balance - 2.11;
          }
          break;
        case 3:
          point++;
          balance += 0.5;
          if (point === 8) {
            point = 0;
            level++;
            newProfit = balance - 11.72;
          }
          break;
        case 4:
          point++;
          balance += 0.5;
          if (point === 16) {
            point = 0;
            level++;
            newProfit = balance - 37.92;
          }
          break;
        case 5:
          point++;
          balance += 0.5;
          if (point === 32) {
            point = 0;
            level++;
            newProfit = balance - 432.63;
          }
          break;
        case 6:
          point++;
          balance += 0.5;
          if (point === 64) {
            point = 0;
            level = 6; 
            newProfit = balance - 5;
          }
          break;
        default:
          level = 1;
          point = 1;
          balance += 0.5;
          break;
      }
  
      user.balance = balance;
      user.profit = profit + newProfit;
      user.level = level;
      user.point = point;
  
      await user.save();
  console.log(user)
      return true;
    } catch (error) {
      console.error('Error updating user tree:', error);
      throw error;
    }
  };
  
  module.exports = updateTree;
  