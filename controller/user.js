const User = require("../model/user");
const addReferral = require("../util/main");
const getReferralTree = require("../util/referralTree");
const findFirstEmptyDownline = require("../util/findSlot");

exports.registerUser = async (req, res) => {
  const { username, telegramId, walletAddress, upline } = req.body;
  try {
    const walletAddressExists = await User.findOne({ walletAddress });
    const telegramIdExists = await User.findOne({ telegramId });

    if (walletAddressExists) {
      return res
        .status(400)
        .json({ message: "Wallet address already exists." });
    }

    if (telegramIdExists) {
      return res.status(400).json({ message: "Telegram ID already exists." });
    }

    const existingAdmin01 = await User.findOne({
      username: "mainAdmin",
      upline: "Admin",
    });
    if (existingAdmin01) {
      if (username === "Admin" || username === "mainAdmin") {
        return res
          .status(400)
          .json({ message: "Username Cant be Admin or admin already exists" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const existingUpline = await User.findOne({ upline });
      if (!existingUpline && upline !== "mainAdmin") {
        return res
          .status(400)
          .json({
            message:
              "Your upline must be valid user or your upline must be mainAdmin ",
          });
      }
    } else {
    }
    // Create new user document
    const newUser = new User({
      username,
      walletAddress,
      telegramId,
      upline, // Assuming upline is already validated (see note below)
      invited_by: upline,
    });

    if (upline === "Admin") {
      newUser.uplinerTree.push({ userId: newUser._id });
    } else {
      const referralUser = await User.findOne({ username: upline });
      if (!referralUser) {
        return res.status(400).json({ message: "Referral Link is wrong" });
      }
      if (
        referralUser.downliner1 !== "Empty" &&
        referralUser.downliner2 !== "Empty"
      ) {
        let finalResult = await findFirstEmptyDownline(upline);

        if (!finalResult) {
          return res
            .status(400)
            .json({ message: "No available downline found" });
        }

        newUser.upline = finalResult.upline;

        const overflowUser = await User.findOne({
          username: finalResult.upline,
        });
        if (!overflowUser) {
          return res.status(400).json({ message: "Overflow Link is wrong" });
        }

        if (finalResult.position === "downliner1") {
          overflowUser.downliner1 = newUser.username;
        } else {
          overflowUser.downliner2 = newUser.username;
        }

        await overflowUser.save();

        newUser.uplinerTree = [
          ...overflowUser.uplinerTree,
          { userId: newUser._id },
        ];
      } else {
        if (referralUser.downliner1 === "Empty") {
          referralUser.downliner1 = newUser.username;
        } else {
          referralUser.downliner2 = newUser.username;
        }

        await referralUser.save();

        newUser.uplinerTree = [
          ...referralUser.uplinerTree,
          { userId: newUser._id },
        ];
      }
    }

    await newUser.save();

    if (newUser.uplinerTree.length > 1) {
      const modifiedUplinerTree = newUser.uplinerTree.slice(0, -1);
      addReferral(modifiedUplinerTree);
    }

    const token = await newUser.generateAuthToken();
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error registering user" });
  }
};

exports.findSlot = async (req, res) => {
  const { rootUsername } = req.body;

  try {
    const result = await findFirstEmptyDownline(rootUsername);
    if (result) {
      res.status(200).json(result);
    } else {
      const nextAvailableDownline = await findFirstEmptyDownline(result.upline); // Attempt to find next available downline
      if (nextAvailableDownline) {
        res.status(200).json(nextAvailableDownline);
      } else {
        res.status(404).json({ message: "No available slot found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(401).json({ message: "Invalid telegramId" });
    }

    const token = await user.generateAuthToken();
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error logging in user" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userDetails = req.user;
    return res.status(200).json(userDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching user details" });
  }
};

exports.getReferralTree = async (req, res) => {
  try {
    const { username } = req.body;
    const referralTree = await getReferralTree(username);
    return res.status(200).json({ username, referralTree });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching user details" });
  }
};

exports.resetAndDropUsers = async (req, res) => {
  try {
    // Find users with upline as "Admin"
    const adminUplineUsers = await User.find({ upline: "Admin" });

    // Loop through each user and reset the specified fields
    for (const user of adminUplineUsers) {
      user.point = 0;
      user.level = 1;
      user.downliner1 = "Empty";
      user.downliner2 = "Empty";
      user.refferalEarnings = 0;
      user.avaliableProfit = 0;
      await user.save();
    }

    // Delete all other users
    await User.deleteMany({ upline: { $ne: "Admin" } });
    return res
      .status(500)
      .json({ message: "Users reset and others deleted successfully." });
  } catch (error) {
    console.error("Error in resetting and deleting users:", error);
    return res
      .status(500)
      .json({ message: "Error in resetting and deleting users" });
  }
};

exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(200).json({ available: false });
    }

    return res.status(200).json({ available: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error checking username availability" });
  }
};
