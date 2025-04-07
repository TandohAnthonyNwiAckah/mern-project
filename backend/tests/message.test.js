
const { getMessages,sendMessage } = require('../controllers/messages'); 
const Message = require('../models/Message');
const User = require('../models/User');
jest.mock('../models/Message');
jest.mock('../models/User');

describe('Messages Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });



  
  describe('getMessages', () => {
    it('should return all messages sorted by timestamp', async () => {
      const mockMessages = [{ text: 'Hello' }, { text: 'World' }];
      Message.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockMessages)
      });

      await getMessages(req, res);

      expect(Message.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ messages: mockMessages });
    });

    it('should return 500 if there is a server error', async () => {
      Message.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      await getMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', code: 500 });
    });
  });




  describe('sendMessage', () => {
    it('should return 401 if username or text is not provided', async () => {
      await sendMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username and message are required', code: 401 });
    });

    it('should return 403 if user is not active in the chat room', async () => {
      req.body = { username: 'inactiveUser', text: 'Hello' };
      User.findOne.mockResolvedValue(null);

      await sendMessage(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ username: 'inactiveUser', isActive: true });
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not in chat room', code: 403 });
    });

    it('should return 405 if there are less than 5 active users', async () => {
      req.body = { username: 'activeUser', text: 'Hello' };
      User.findOne.mockResolvedValue({ username: 'activeUser', isActive: true });
      User.countDocuments.mockResolvedValue(4);

      await sendMessage(req, res);

      expect(User.countDocuments).toHaveBeenCalledWith({ isActive: true });
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ message: 'At least 5 active users are required !', code: 405 });
    });

    it('should return 201 if message is sent successfully', async () => {
      req.body = { username: 'activeUser', text: 'Hello' };
      User.findOne.mockResolvedValue({ username: 'activeUser', isActive: true });
      User.countDocuments.mockResolvedValue(5);
      Message.prototype.save = jest.fn().mockResolvedValue();

      await sendMessage(req, res);

      expect(Message.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Message sent successfully', code: 201 });
    });

    it('should return 500 if there is a server error', async () => {
      req.body = { username: 'activeUser', text: 'Hello' };
      User.findOne.mockRejectedValue(new Error('Database error'));

      await sendMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', code: 500 });
    });
  });



});