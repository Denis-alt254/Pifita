const express = require('express');
const { createUser, Login, Me } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', createUser);
router.post('login', Login);
router.get('/me', authMiddleware, Me);

module.exports = router;