const Message = require('../models/Message');
const User = require('../models/User');


/// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: 'Server error', code:500 });
  }
};


/// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { username, text } = req.body;
    
    if (!username || !text) {
      return res.status(401).json({ message: 'Username and message are required' ,code: 401 });
    }

    const userExists = await User.findOne({ username, isActive: true });
    if (!userExists) {
      return res.status(403).json({ message: 'User not in chat room',code:403 });
    }


    const activeUsersCount = await User.countDocuments({ isActive: true });
    if (activeUsersCount < 5) {
      return res.status(405).json({ message: 'At least 5 active users are required !', code: 405 });
    }

    const message = new Message({ username, text });
    await message.save();

    
    res.status(201).json({ message: 'Message sent successfully',code:201 });
  } catch (err) {
    res.status(500).json({ message: 'Server error',code:500 });
  }
};


