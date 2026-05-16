const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createExpense, updateExpense, getExpensesByUser, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();

router.post('/create', authMiddleware, createExpense);
router.patch('/update', authMiddleware, updateExpense);
router.get('/', authMiddleware, getExpensesByUser);
router.delete('/delete', authMiddleware, deleteExpense);

module.exports = router;