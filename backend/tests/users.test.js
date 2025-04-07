const { joinChat } = require('../controllers/users');
jest.mock('../models/User'); 
const User = require('../models/User');


describe('joinChat', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('should return 401 if username is not provided', async () => {
    await joinChat(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username is required', code: 401 });
  });

  it('should return 409 if username already exists', async () => {
    req.body.username = 'existingUser';
    User.findOne.mockResolvedValue({ username: 'existingUser' });

    await joinChat(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'existingUser' });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username already taken', code: 409 });
  });

  it('should return 201 if user is successfully created', async () => {
    req.body.username = 'newUser';
    User.findOne.mockResolvedValue(null);
    User.prototype.save = jest.fn().mockResolvedValue();

    await joinChat(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'newUser' });
    expect(User.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Joined chat successfully', code: 201 });
  });

  it('should return 500 if there is a server error', async () => {
    req.body.username = 'newUser';
    User.findOne.mockRejectedValue(new Error('Database error'));

    await joinChat(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error', code: 500 });
  });
});