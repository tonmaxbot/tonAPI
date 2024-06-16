const updateTree = require("./referral")

const addReferral = (userReferralArray) => {
   
    userReferralArray.forEach(user => {
      updateTree(user.userId).then(() => {
        console.log('User tree updated successfully!');
      })
      .catch(error => {
        console.error('Error updating user tree:', error);
      });
    });
  };

  module.exports = addReferral