const User = require('../model/user');
const addReferral = require("../util/main")

exports.registerUser = async (req, res) => {
  const { username, walletAddress, upline, balance } = req.body;
 const uplinerArray = []
 const adminUpliner = []
 const nonAdminUpliner = []
  try {
    // Check for existing user (optional, based on your requirements)
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
   
 
 

    // Create new user document
    const newUser = new User({
      username,
      walletAddress,
      upline, // Assuming upline is already validated (see note below)
     
    });


    if(upline == "Admin"){
      newUser.uplinerTree.push({ userId: newUser._id });
    }else{
      const referralUser = await User.findOne({ username : upline });
      if (!referralUser) {
        return res.status(400).json({ message: 'Referral Link is wrong' });
      }
      // Extract the uplinerTree from the referral user and add new user's ID
      const newUplinerTree = [...referralUser.uplinerTree, { userId: newUser._id }];
      newUser.uplinerTree = newUplinerTree;
    }
   
    await newUser.save(); // Save user document to database
 
    if(newUser.uplinerTree.length > 1){
      addReferral(newUser.uplinerTree);
    }
    

    const token = await newUser.generateAuthToken();
    return res.status(201).json({ message: 'User registered successfully',token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error registering user' });
  }
};

exports.loginUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    const token = await user.generateAuthToken();
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error logging in user' });
  }
};


exports.getUserDetails = async (req, res) => {
  try {
    const userDetails = req.user; 
    return res.status(200).json(userDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching user details' });
  }
};



exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.body; 
  try {
    const existingUser = await User.findOne({ username }); 

    if (existingUser) {
      return res.status(200).json({ available : false });
    }

    return res.status(200).json({ available : true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error checking username availability' });
  }
};

