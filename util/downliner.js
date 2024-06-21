const User = require('../model/user');

async function getDownlines(username) {
    let downlineArray = [];

    if (username === "Empty") {
        downlineArray.push("Empty", "Empty");
        return downlineArray;
    }

    const user = await User.findOne({ username });

    if (!user) {
        console.log("No user found for username:", username);
        downlineArray.push("Empty", "Empty");
        return downlineArray;
    }

    const firstDownline = user.downliner1 === "Empty" ? "Empty" : user.downliner1;
    const secondDownline = user.downliner2 === "Empty" ? "Empty" : user.downliner2;

    downlineArray.push(firstDownline, secondDownline);

    return downlineArray;
}

module.exports = getDownlines;
