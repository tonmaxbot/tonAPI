const User = require("../model/user");

async function updateTree(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    let {
      username,
      walletAddress,
      refferalEarnings,
      avaliableProfit,
      upline,
      uplinerTree,
      level,
      point,
    } = user;

    let newavaliableProfit = 0;

    switch (level) {
      case 1:
        point++;
        refferalEarnings += 0.5;
        avaliableProfit += 0.09;
        if (point === 2) {
          point = 0;
          level++;
        }
        break;
      case 2:
        point++;
        refferalEarnings += 0.82;
        avaliableProfit += 0.2925;
        if (point === 4) {
          point = 0;
          level++;
        }
        break;
      case 3:
        point++;
        refferalEarnings += 2.11;
        avaliableProfit += 0.645;
        if (point === 8) {
          point = 0;
          level++;
        }
        break;
      case 4:
        point++;
        refferalEarnings += 11.72;
        avaliableProfit += 9.35;
        if (point === 16) {
          point = 0;
          level++;
        }
        break;
      case 5:
        point++;
        refferalEarnings += 37.92;
        avaliableProfit += 24.4;
        if (point === 32) {
          point = 0;
          level++;
        }
        break;
      case 6:
        point++;
        refferalEarnings += 432.63;
        avaliableProfit += 0.29;
        if (point === 64) {
          level = 6;
        }
        break;
      default:
        break;
    }

    user.refferalEarnings = refferalEarnings;
    user.avaliableProfit = avaliableProfit;
    user.level = level;
    user.point = point;

    await user.save();
    console.log(user);
    return true;
  } catch (error) {
    console.error("Error updating user tree:", error);
    throw error;
  }
}

module.exports = updateTree;
