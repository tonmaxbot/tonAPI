
const getDownlines = require("../util/downliner");

async function getReferralTree(Username) {
  let finalTree = [];
  const levels = [2, 4, 8, 16, 32]; 

  let usernames = [Username];

  for (let step = 0; step < levels.length; step++) {
    let currentLevel = [];

    for (let i = 0; i < levels[step]; i++) {
      let prevUsername = usernames[Math.floor(i / 2)];
      let downlines = prevUsername ? await getDownlines(prevUsername) : null;
      if (!downlines || !Array.isArray(downlines)) {
        downlines = ["Empty", "Empty"];
      }
      currentLevel.push(downlines[i % 2] || "Empty");
    }

    if (currentLevel.every(u => u === "Empty")) {
      break;
    } else {
      finalTree.push(currentLevel);
      usernames = currentLevel;
    }
  }

  return finalTree;
}

module.exports = getReferralTree;




/* ezele's Code
const getDownlines = require("../util/downliner");
const User = require("../model/user");

async function getReferralTree(username) {
  let finalTree = [];
  let step = 1;
  let LevelOne1, LevelOne2;
  let LevelTwo1, LevelTwo2, LevelTwo3, LevelTwo4;
  let LevelThree1, LevelThree2, LevelThree3, LevelThree4, LevelThree5, LevelThree6, LevelThree7, LevelThree8;
  let LevelFour1, LevelFour2, LevelFour3, LevelFour4, LevelFour5, LevelFour6, LevelFour7, LevelFour8, LevelFour9, LevelFour10, LevelFour11, LevelFour12, LevelFour13, LevelFour14, LevelFour15, LevelFour16;
  let LevelFive1, LevelFive2, LevelFive3, LevelFive4, LevelFive5, LevelFive6, LevelFive7, LevelFive8, LevelFive9, LevelFive10, LevelFive11, LevelFive12, LevelFive13, LevelFive14, LevelFive15, LevelFive16, LevelFive17, LevelFive18, LevelFive19, LevelFive20, LevelFive21, LevelFive22, LevelFive23, LevelFive24, LevelFive25, LevelFive26, LevelFive27, LevelFive28, LevelFive29, LevelFive30, LevelFive31, LevelFive32;
 
  if (step === 1) {
    const firstBatch = await getDownlines(username);
    LevelOne1 = firstBatch[0];
    LevelOne2 = firstBatch[1];

    if (LevelOne1 === "Empty" && LevelOne2 === "Empty") {
      return finalTree;
    } else {
      finalTree.push({ LevelOne1, LevelOne2 });
      step++;
    }
  }

  if (step === 2) {
    const secondBatch = await getDownlines(LevelOne1);
    LevelTwo1 = secondBatch[0];
    LevelTwo2 = secondBatch[1];
    const thirdBatch = await getDownlines(LevelOne2);
    LevelTwo3 = thirdBatch[0];
    LevelTwo4 = thirdBatch[1];

    if (LevelTwo1 === "Empty" && LevelTwo2 === "Empty" && LevelTwo3 === "Empty" && LevelTwo4 === "Empty") {
      return finalTree;
    } else {
      finalTree.push({ LevelTwo1, LevelTwo2, LevelTwo3, LevelTwo4 });
      step++;
    }
  }

  if (step === 3) {
    const fourthBatch = await getDownlines(LevelTwo1);
    LevelThree1 = fourthBatch[0];
    LevelThree2 = fourthBatch[1];
    const fifthBatch = await getDownlines(LevelTwo2);
    LevelThree3 = fifthBatch[0];
    LevelThree4 = fifthBatch[1];
    const sixthBatch = await getDownlines(LevelTwo3);
    LevelThree5 = sixthBatch[0];
    LevelThree6 = sixthBatch[1];
    const seventhBatch = await getDownlines(LevelTwo4);
    LevelThree7 = seventhBatch[0];
    LevelThree8 = seventhBatch[1];

    if (LevelThree1 === "Empty" && LevelThree2 === "Empty" && LevelThree3 === "Empty" && LevelThree4 === "Empty" &&
        LevelThree5 === "Empty" && LevelThree6 === "Empty" && LevelThree7 === "Empty" && LevelThree8 === "Empty") {
      return finalTree;
    } else {
      finalTree.push({ LevelThree1, LevelThree2, LevelThree3, LevelThree4, LevelThree5, LevelThree6, LevelThree7, LevelThree8 });
      step++;
    }
  }

  if (step === 4) {
    const eighthBatch = await getDownlines(LevelThree1);
    LevelFour1 = eighthBatch[0];
    LevelFour2 = eighthBatch[1];
    const ninthBatch = await getDownlines(LevelThree2);
    LevelFour3 = ninthBatch[0];
    LevelFour4 = ninthBatch[1];
    const tenthBatch = await getDownlines(LevelThree3);
    LevelFour5 = tenthBatch[0];
    LevelFour6 = tenthBatch[1];
    const eleventhBatch = await getDownlines(LevelThree4);
    LevelFour7 = eleventhBatch[0];
    LevelFour8 = eleventhBatch[1];
    const twelfthBatch = await getDownlines(LevelThree5);
    LevelFour9 = twelfthBatch[0];
    LevelFour10 = twelfthBatch[1];
    const thirteenthBatch = await getDownlines(LevelThree6);
    LevelFour11 = thirteenthBatch[0];
    LevelFour12 = thirteenthBatch[1];
    const fourteenthBatch = await getDownlines(LevelThree7);
    LevelFour13 = fourteenthBatch[0];
    LevelFour14 = fourteenthBatch[1];
    const fifteenthBatch = await getDownlines(LevelThree8);
    LevelFour15 = fifteenthBatch[0];
    LevelFour16 = fifteenthBatch[1];

    if (LevelFour1 === "Empty" && LevelFour2 === "Empty" && LevelFour3 === "Empty" && LevelFour4 === "Empty" &&
        LevelFour5 === "Empty" && LevelFour6 === "Empty" && LevelFour7 === "Empty" && LevelFour8 === "Empty" &&
        LevelFour9 === "Empty" && LevelFour10 === "Empty" && LevelFour11 === "Empty" && LevelFour12 === "Empty" &&
        LevelFour13 === "Empty" && LevelFour14 === "Empty" && LevelFour15 === "Empty" && LevelFour16 === "Empty") {
      return finalTree;
    } else {
      finalTree.push({ LevelFour1, LevelFour2, LevelFour3, LevelFour4, LevelFour5, LevelFour6, LevelFour7, LevelFour8, LevelFour9, LevelFour10, LevelFour11, LevelFour12, LevelFour13, LevelFour14, LevelFour15, LevelFour16 });
      step++;
    }
  }

  if (step === 5) {
    const sixteenthBatch = await getDownlines(LevelFour1);
    LevelFive1 = sixteenthBatch[0];
    LevelFive2 = sixteenthBatch[1];
    const seventeenthBatch = await getDownlines(LevelFour2);
    LevelFive3 = seventeenthBatch[0];
    LevelFive4 = seventeenthBatch[1];
    const eighteenthBatch = await getDownlines(LevelFour3);
    LevelFive5 = eighteenthBatch[0];
    LevelFive6 = eighteenthBatch[1];
    const nineteenthBatch = await getDownlines(LevelFour4);
    LevelFive7 = nineteenthBatch[0];
    LevelFive8 = nineteenthBatch[1];
    const twentiethBatch = await getDownlines(LevelFour5);
    LevelFive9 = twentiethBatch[0];
    LevelFive10 = twentiethBatch[1];
    const twentyFirstBatch = await getDownlines(LevelFour6);
    LevelFive11 = twentyFirstBatch[0];
    LevelFive12 = twentyFirstBatch[1];
    const twentySecondBatch = await getDownlines(LevelFour7);
    LevelFive13 = twentySecondBatch[0];
    LevelFive14 = twentySecondBatch[1];
    const twentyThirdBatch = await getDownlines(LevelFour8);
    LevelFive15 = twentyThirdBatch[0];
    LevelFive16 = twentyThirdBatch[1];
    const twentyFourthBatch = await getDownlines(LevelFour9);
    LevelFive17 = twentyFourthBatch[0];
    LevelFive18 = twentyFourthBatch[1];
    const twentyFifthBatch = await getDownlines(LevelFour10);
    LevelFive19 = twentyFifthBatch[0];
    LevelFive20 = twentyFifthBatch[1];
    const twentySixthBatch = await getDownlines(LevelFour11);
    LevelFive21 = twentySixthBatch[0];
    LevelFive22 = twentySixthBatch[1];
    const twentySeventhBatch = await getDownlines(LevelFour12);
    LevelFive23 = twentySeventhBatch[0];
    LevelFive24 = twentySeventhBatch[1];
    const twentyEighthBatch = await getDownlines(LevelFour13);
    LevelFive25 = twentyEighthBatch[0];
    LevelFive26 = twentyEighthBatch[1];
    const twentyNinthBatch = await getDownlines(LevelFour14);
    LevelFive27 = twentyNinthBatch[0];
    LevelFive28 = twentyNinthBatch[1];
    const thirtiethBatch = await getDownlines(LevelFour15);
    LevelFive29 = thirtiethBatch[0];
    LevelFive30 = thirtiethBatch[1];
    const thirtyFirstBatch = await getDownlines(LevelFour16);
    LevelFive31 = thirtyFirstBatch[0];
    LevelFive32 = thirtyFirstBatch[1];

    if (LevelFive1 === "Empty" && LevelFive2 === "Empty" && LevelFive3 === "Empty" && LevelFive4 === "Empty" &&
        LevelFive5 === "Empty" && LevelFive6 === "Empty" && LevelFive7 === "Empty" && LevelFive8 === "Empty" &&
        LevelFive9 === "Empty" && LevelFive10 === "Empty" && LevelFive11 === "Empty" && LevelFive12 === "Empty" &&
        LevelFive13 === "Empty" && LevelFive14 === "Empty" && LevelFive15 === "Empty" && LevelFive16 === "Empty" && LevelFive17 === "Empty" && LevelFive18 === "Empty" &&
        LevelFive19 === "Empty" && LevelFive20 === "Empty" && LevelFive21 === "Empty" && LevelFive22 === "Empty" &&
        LevelFive23 === "Empty" && LevelFive24 === "Empty" && LevelFive25 === "Empty" && LevelFive26 === "Empty" &&
        LevelFive27 === "Empty" && LevelFive28 === "Empty" && LevelFive29 === "Empty" && LevelFive30 === "Empty" &&
        LevelFive31 === "Empty" && LevelFive32 === "Empty") {
      return finalTree;
    } else {
      finalTree.push({
        LevelFive1, LevelFive2, LevelFive3, LevelFive4, LevelFive5, LevelFive6, LevelFive7, LevelFive8,
        LevelFive9, LevelFive10, LevelFive11, LevelFive12, LevelFive13, LevelFive14, LevelFive15, LevelFive16,
        LevelFive17, LevelFive18, LevelFive19, LevelFive20, LevelFive21, LevelFive22, LevelFive23, LevelFive24,
        LevelFive25, LevelFive26, LevelFive27, LevelFive28, LevelFive29, LevelFive30, LevelFive31, LevelFive32
      });
    }
  }

  return finalTree;
}

module.exports = getReferralTree;
**/