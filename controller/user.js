const User = require('../model/user');


exports.register = async (req, res) => {
  const { telegramId, username, walletAddress } = req.body;

  // Validate telegramId and username
  if (!telegramId || !username || !walletAddress) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await User.findOne({ telegramId });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({ telegramId, username,walletAddress });
    await user.save();

    const token = await user.generateAuthToken();
    return res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { telegramId} = req.body;

  // Validate telegramId and username
  if (!telegramId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = await user.generateAuthToken();
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserByTelegramId = async (req, res) => {
    const { telegramId } = req.body; // Assuming telegramId is passed in the URL path
  
    // Validate telegramId
    if (!telegramId) {
      return res.status(400).json({ message: 'Missing telegramId' });
    }
  
    try {
      const user = await User.findOne({ telegramId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(user); // You might want to filter sensitive data before sending the response
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
