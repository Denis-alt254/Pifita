const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createBudget, updateBudget } = require('../controllers/budgetController');
const router = express.Router();

router.post('/create', authMiddleware, createBudget);
router.post('/update', authMiddleware, updateBudget);

module.exports = router;