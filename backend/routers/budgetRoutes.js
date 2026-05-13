const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createBudget } = require('../controllers/budgetController');
const router = express.Router();

router.post('/create', authMiddleware, createBudget);

module.exports = router;