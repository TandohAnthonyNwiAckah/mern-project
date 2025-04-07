const User = require('../models/User');


exports.joinChat = async (req, res) => {
  try {
    const { username } = req.body;

    console.log('Username:', username);
    
    if (!username) {
      return res.status(401).json({ message: 'Username is required' ,code: 401 });
    }

    // Check if username is already in use
    const existingUser = await User.findOne({ username });
  
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' , code: 409 });

    }

    const user = new User({ username });
    await user.save();
    
    res.status(201).json({ message: 'Joined chat successfully',code :201});
  } catch (err) {
    res.status(500).json({ message: 'Server error',code :500 });
  }
};