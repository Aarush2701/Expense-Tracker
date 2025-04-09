const express = require('express');
const { 
    getAllTransactions,
    addTransaction, 
    deleteTransaction,
    getCategorySummary,
 }
    = require('../Controllers/ExpenseController');
const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', addTransaction);
router.delete('/:expenseId', deleteTransaction);
router.get('/category-summary', getCategorySummary);

module.exports = router;