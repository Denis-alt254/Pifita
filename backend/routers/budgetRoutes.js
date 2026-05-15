const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createBudget, updateBudget, deleteBudget } = require('../controllers/budgetController');
const router = express.Router();

router.post('/create', authMiddleware, createBudget);
router.patch('/update/:id', authMiddleware, updateBudget);
router.delete('/delete/:id', authMiddleware, deleteBudget);

module.exports = router;