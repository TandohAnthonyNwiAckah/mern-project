const express = require('express');
const router = express.Router();

const chatController = require('../controllers/messages');

router.get('/', chatController.getMessages);
router.post('/', chatController.sendMessage);


module.exports = router;